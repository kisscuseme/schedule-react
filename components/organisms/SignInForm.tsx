import { css } from "@emotion/react";
import { Col, Row } from "react-bootstrap";
import { Input } from "../atoms/input/Input";
import { Button } from "../atoms/button/Button";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

export const SignInForm = () => {
  const groupBtnStyle = css`
    width: 100%;
    text-align: center;
  `;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const signInClickHandler = () => {
    alert("일정 페이지로 임시 이동");
    router.replace('/schedule');

    try {
      // auth 서비스 이메일 로그인 함수 수행
      // firbaseAuth.emailLogin(email, password);
    } catch(error) {
      console.log(error);
    }
    
    
  }
  const resetPasswordClickHandler = () => {
    if (email === ""){
      alert("메일 주소를 입력해주세요.");
    }
    else{
      try {
        const result = confirm(email + "으로 비밀번호 초기화 메일을 발송 하시겠습니까?");

        if(result) {
          // auth 서비스 비밀번호 초기화 메일 발송 함수 수행
          // firebaseAuth.resetPassword(email);
        }
      }
      catch(error) {
        console.log(error);
      }
    }
  }
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
    </div>
  )
}