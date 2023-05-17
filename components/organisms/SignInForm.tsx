import { css } from "@emotion/react";
import { Col, Row } from "react-bootstrap";
import { Input } from "../atoms/input/Input";
import { Button } from "../atoms/button/Button";
import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, useState } from "react";
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [userInfo, setUserInfo] = useRecoilState<UserType>(userInfoState);
  const setShowModal = useSetRecoilState(showModalState);

  const router = useRouter();

  const signInWithEmail = (loginInfo: {email: string, password: string}) => {
    return signIn(loginInfo.email, loginInfo.password);
  }

  const signInMutation = useMutation(signInWithEmail, {
    onMutate: variable => {
      // console.log("onMutate", variable);
    },
    onError: (error, variable, context) => {
      // error
    },
    onSuccess: (data, variables, context) => {
      if(typeof data !== 'string') {
        if(data.user.emailVerified) {
          if(userInfo === null) {
            setUserInfo({
              uid: data.user.uid,
              name: data.user.displayName as string,
              email: data.user.email as string
            });
          }
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
              await sendEmailVerification(data.user);
              setPassword("");
              setShowModal({
                show: true,
                title: "알림",
                content: "인증 메일 재발송이 완료되었습니다."
              });
            }
          });
        }
      } else {
        setErrorMsg(data);
      }
    },
    onSettled: () => {
      // console.log("end");
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
    onMutate: variable => {
      // console.log("onMutate", variable);
    },
    onError: (error, variable, context) => {
      // error
    },
    onSuccess: (data, variables, context) => {
      setShowModal({
        show: true,
        title: "알림",
        content: "메일 발송을 완료하였습니다."
      });
    },
    onSettled: () => {
      // console.log("end");
    }
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