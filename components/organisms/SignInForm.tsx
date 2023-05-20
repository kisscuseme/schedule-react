import { css } from "@emotion/react";
import { Col, Row } from "react-bootstrap";
import { Input } from "../atoms/input/Input";
import { Button } from "../atoms/button/Button";
import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { checkEmail, s } from "@/services/util/util";
import { Text } from "../atoms/text/Text";
import { firebaseAuth } from "@/services/firebase/firebase";
import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { UserType } from "@/services/firebase/firebase.type";
import { showModalState, userInfoState } from "@/states/states";
import { signIn } from "@/services/firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { t } from "i18next";

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
            title: s(t("Check")),
            content: `${s(t("E-mail verification has not been completed."))} ${s(t("Would you like to resend the verification e-mail?"))}`,
            confirm: async () => {
              setShowModal({
                show: false
              });
              try {
                await sendEmailVerification(data.user);
                setPassword("");
                setShowModal({
                  show: true,
                  title: s(t("Check")),
                  content: s(t("Resending of verification e-mail has been completed."))
                });
              } catch(error: any) {
                let message;
                if(error.code === "auth/too-many-requests" ) {
                  message = `${s(t("Lots of attempts."))} ${s(t("Please try again later."))}`;
                } else {
                  message = error.message;
                }

                setShowModal({
                  show: true,
                  title: s(t("Check")),
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
      setErrorMsg("Please enter your e-mail.");
    } else if(!checkEmail(email)) {
      setErrorMsg("Please check your email format.");
    } else if(password === "") {
      setErrorMsg("Please enter your password.");
    } else {
      setErrorMsg("");
      signInMutation.mutate({ email: email, password });
    }
  };

  const resetPassword = async () => {
    try {
      return await sendPasswordResetEmail(firebaseAuth, email);
    } catch (error: any) {
      setErrorMsg(`${s(t("An error occurred while sending e-mail."))}\n` + error.message);
    }
  }

  const resetPasswordMutation = useMutation(resetPassword, {
    onError: (error: any) => {
      let message;
      if(error.code === "auth/too-many-requests" ) {
        message = `${s(t("Lots of attempts."))} ${s(t("Please try again later."))}`;

      } else {
        message = error.message;
      }
      setShowModal({
        show: true,
        title: s(t("Check")),
        content: message
      });
    },
    onSuccess: () => {
      setShowModal({
        show: true,
        title: s(t("Check")),
        content: s(t("E-mail sending has been completed."))
      });
    },
  });

  const resetPasswordClickHandler = () => {
    if(email === "") {
      setErrorMsg("Please enter your e-mail.");
    } else if (!checkEmail(email)) {
      setErrorMsg("Please check your email format.");
    } else {
      try {
        setShowModal({
          show: true,
          title: s(t("Check")),
          content: s(t("Would you like to send a password reset e-mail to ?", {email: email})),
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
            placeholder={s(t("E-mail"))}
            type="email"
            value={email}
            initValue={email}
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
            placeholder={s(t("Password"))}
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
            {s(t("Sign In"))}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <div css={groupBtnStyle}>
            <Button onClick={resetPasswordClickHandler}>{s(t("Reset Password"))}</Button>
            <Button onClick={signUpClickHandler}>{s(t("Sign Up"))}</Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Text align="center" color="hotpink">{s(t(errorMsg))}</Text>
        </Col>
      </Row>
    </div>
  )
}