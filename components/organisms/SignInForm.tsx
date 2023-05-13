import { css } from "@emotion/react";
import { Col, Row } from "react-bootstrap";
import { Input } from "../atoms/input/Input";
import { Button } from "../atoms/button/Button";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { checkEmail } from "@/services/util/util";
import { Text } from "../atoms/text/Text";
import { firebaseAuth } from "@/services/firebase/firebase";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";

export const SignInForm = () => {
  const groupBtnStyle = css`
    width: 100%;
    text-align: center;
  `;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  const signIn = async () => {
    try {
      const curUserInfo = await signInWithEmailAndPassword(firebaseAuth, email, password);
      return curUserInfo;
      
    } catch (error: any) {
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          setErrorMsg("이메일 주소 또는 비밀번호가 잘못되었습니다.");
          break;
        default:
          setErrorMsg("로그인 중 에러가 발생하였습니다.\n" + error.message);
          break;
      }
    }
  }

  const signInClickHandler = async () => {
    if(!checkEmail(email)) {
      setErrorMsg("이메일 형식을 확인해 주세요.");
    } else if(password === "") {
      setErrorMsg("패스워드를 입력해 주세요.");
    } else {
      const result = await signIn();
      if(result) {
        router.replace('/schedule');
      }
    }
  }

  const resetPassword = async () => {
    try {
      return await sendPasswordResetEmail(firebaseAuth, email);
    } catch (error: any) {
      setErrorMsg("메일 전송 중 에러가 발생하였습니다.\n" + error.message);
    }
  }

  const resetPasswordClickHandler = () => {
    if (!checkEmail(email)) {
      setErrorMsg("이메일 형식을 확인해 주세요.");
    } else {
      try {
        const result = confirm(
          email + "으로 비밀번호 초기화 메일을 발송 하시겠습니까?"
        );
        if (result) {
          resetPassword();
        }
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
            onChange={emailChangeHandler}
            clearButton={setEmail}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            placeholder="Password"
            type="password"
            onChange={passwordChangeHandler}
            clearButton={setPassword}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button align="right" primary onClick={signInClickHandler}>
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