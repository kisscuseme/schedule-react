import { css } from "@emotion/react";
import { Col, Row } from "react-bootstrap";
import { Input } from "../atoms/input/Input";
import { Button } from "../atoms/button/Button";
import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { checkEmail } from "@/services/util/util";
import { Text } from "../atoms/text/Text";
import { firebaseAuth } from "@/services/firebase/firebase";
import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { UserType } from "@/services/firebase/firebase.type";
import { showModalState, userInfoState } from "@/states/states";
import { signIn } from "@/services/firebase/auth";
import { useMutation } from "@tanstack/react-query";

export const SignInForm = () => {
  const groupBtnStyle = css`
    width: 100%;
    text-align: center;
  `;

  const [email, setEmail] = useState(localStorage.getItem("email")||"");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [userInfo, setUserInfo] = useRecoilState<UserType>(userInfoState);
  const setShowModal = useSetRecoilState(showModalState);
  const emailClearButtonRef = useRef<HTMLButtonElement>(null);
  const passwordClearButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if(password === "") {
      passwordClearButtonRef.current?.click();
    }
    if(email === "") {
      emailClearButtonRef.current?.click();
    }
  }, [password, email]);

  const router = useRouter();

  const signInWithEmail = (loginInfo: {email: string, password: string}) => {
    return signIn(loginInfo.email, loginInfo.password);
  }

  const signInMutation = useMutation(signInWithEmail, {
    onSuccess(data) {
      if(typeof data !== 'string') {
        if(data.user.emailVerified) {
          if(userInfo === null) {
            setUserInfo({
              uid: data.user.uid,
              name: data.user.displayName as string,
              email: data.user.email as string
            });
          }
          localStorage.setItem("email", email);
          router.reload();
        } else {
          setShowModal({
            show: true,
            title: "알림",
            content: "이메일 인증이 완료되지 않았습니다. 인증 메일을 재발송 하시겠습니까?",
            confirm: async () => {
              setShowModal({
                show: false
              });
              try {
                await sendEmailVerification(data.user);
                setPassword("");
                setShowModal({
                  show: true,
                  title: "알림",
                  content: "인증 메일 재발송이 완료되었습니다."
                });
              } catch(error: any) {
                let message;
                if(error.code === "auth/too-many-requests" ) {
                  message = "시도 횟수가 많습니다. 조금 후에 다시 시도해 주세요.";
                } else {
                  message = error.message;
                }

                setShowModal({
                  show: true,
                  title: "알림",
                  content: message
                });
              }
            }
          });
        }
      } else {
        setErrorMsg(data);
      }
    }
  });

  const signInHandleSubmit = () => {
    if(email === "") {
      setErrorMsg("이메일을 입력해 주세요.");
    } else if(!checkEmail(email)) {
      setErrorMsg("이메일 형식을 확인해 주세요.");
    } else if(password === "") {
      setErrorMsg("패스워드를 입력해 주세요.");
    } else {
      setErrorMsg("");
      signInMutation.mutate({ email: email, password });
    }
  };

  const resetPassword = async () => {
    try {
      return await sendPasswordResetEmail(firebaseAuth, email);
    } catch (error: any) {
      setErrorMsg("메일 전송 중 에러가 발생하였습니다.\n" + error.message);
    }
  }

  const resetPasswordMutation = useMutation(resetPassword, {
    onError: (error: any) => {
      let message;
      if(error.code === "auth/too-many-requests" ) {
        message = "시도 횟수가 많습니다. 조금 후에 다시 시도해 주세요.";

      } else {
        message = error.message;
      }
      setShowModal({
        show: true,
        title: "알림",
        content: message
      });
    },
    onSuccess: () => {
      setShowModal({
        show: true,
        title: "알림",
        content: "메일 발송을 완료하였습니다."
      });
    },
  });

  const resetPasswordClickHandler = () => {
    if(email === "") {
      setErrorMsg("이메일을 입력해 주세요.");
    } else if (!checkEmail(email)) {
      setErrorMsg("이메일 형식을 확인해 주세요.");
    } else {
      try {
        setShowModal({
          show: true,
          title: "알림",
          content: email + "으로 비밀번호 초기화 메일을 발송 하시겠습니까?",
          confirm: () => {
            resetPasswordMutation.mutate();
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const signUpClickHandler = () => {
    router.push('/signup');
  }

  const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }

  const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }

  const enterKeyUpEventHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") {
      signInHandleSubmit();
    }
  }

  return (
    <div className="sign-in-form">
      <style>
        {`
          .sign-in-form .row {
            min-height: 70px;
          }
  
          .sign-in-form .col {
            margin: auto;
          }
        `}
      </style>
      <Row>
        <Col>
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={emailChangeHandler}
            clearButton={true}
            clearBtnRef={emailClearButtonRef}
            onClearButtonClick={() => {
              setEmail("");
            }}
            onKeyUp={(enterKeyUpEventHandler)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={passwordChangeHandler}
            clearButton={true}
            clearBtnRef={passwordClearButtonRef}
            onClearButtonClick={() => {
              setPassword("");
            }}
            onKeyUp={enterKeyUpEventHandler}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button align="right" primary onClick={signInHandleSubmit}>
            Sign In
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <div css={groupBtnStyle}>
            <Button onClick={resetPasswordClickHandler}>Reset Password</Button>
            <Button onClick={signUpClickHandler}>Sign Up</Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Text align="center" color="hotpink">{errorMsg}</Text>
        </Col>
      </Row>
    </div>
  )
}