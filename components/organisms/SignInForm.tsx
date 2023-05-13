import { css } from "@emotion/react";
import { Col, Row } from "react-bootstrap";
import { Input } from "../atoms/input/Input";
import { Button } from "../atoms/button/Button";
import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { checkEmail } from "@/services/util/util";
import { Text } from "../atoms/text/Text";
import { firebaseAuth } from "@/services/firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRecoilState } from "recoil";
import { UserType } from "@/services/firebase/firebase.type";
import { userInfoState } from "@/states/states";
import { signIn } from "@/services/firebase/auth";

export const SignInForm = () => {
  const groupBtnStyle = css`
    width: 100%;
    text-align: center;
  `;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [userInfo, setUserInfo] = useRecoilState<UserType>(userInfoState);

  const router = useRouter();

  const signInClickHandler = async () => {
    if(!checkEmail(email)) {
      setErrorMsg("이메일 형식을 확인해 주세요.");
    } else if(password === "") {
      setErrorMsg("패스워드를 입력해 주세요.");
    } else {
      setErrorMsg("");
      const result = await signIn(email, password);
      if(typeof result !== 'string') {
        if(userInfo === null) {
          setUserInfo({
            uid: result.user.uid,
            name: result.user.displayName as string,
            email: result.user.email as string
          });
        }
        router.replace('/schedule');
      } else {
        setErrorMsg(result);
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

  const enterKeyUpEventHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") {
      signInClickHandler();
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
            onChange={emailChangeHandler}
            clearButton={setEmail}
            onKeyUp={(enterKeyUpEventHandler)}
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
            onKeyUp={enterKeyUpEventHandler}
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