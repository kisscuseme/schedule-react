import { Col, Row } from "react-bootstrap";
import { Input } from "../atoms/input/Input";
import { Button } from "../atoms/button/Button";
import { ChangeEvent, useState } from "react";
import { checkEmail, checkPassword } from "@/services/util/util";
import { useRouter } from "next/router";
import { firebaseAuth } from "@/services/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Text } from "../atoms/text/Text";

export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [reconfirmPassword, setReconfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }

  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  }

  const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }

  const reconfirmPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setReconfirmPassword(e.currentTarget.value);
  }

  const register = async () => {
    try {
      setErrorMsg("");
      const createdUser = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      setEmail("");
      setPassword("");
      return createdUser;
    } catch (error: any) {
      switch (error.code) {
        case "auth/weak-password":
          setErrorMsg("비밀번호는 6자리 이상이어야 합니다");
          break;
        case "auth/invalid-email":
          setErrorMsg("잘못된 이메일 형식입니다");
          break;
        case "auth/email-already-in-use":
          setErrorMsg("이미 가입되어 있는 계정입니다");
          break;
        default:
          setErrorMsg("가입 중 에러가 발생하였습니다.\n" + error.message);
          break;
      }
    }
  };

  const regstrationClickHandler = async () => {
    if(!checkEmail(email)) {
      setErrorMsg("이메일 형식을 확인해 주세요.");
    } else if(name === "") {
      setErrorMsg("이름을 입력해 주세요.");
    } else if(!checkPassword(password)) {
      setErrorMsg("비밀번호는 최소 6자리 이상 입력해 주세요.");
    } else if(password !== reconfirmPassword) {
      setErrorMsg("입력한 비밀번호가 동일하지 않습니다.");
    } else {
      const result = await register();
      if(result) {
        alert("회원 가입을 축하합니다.");
        router.replace('/schedule');
      }
    }
  }

  return (
    <div className="sign-up-form">
      <style>
        {`
          .sign-up-form .row {
            min-height: 70px;
          }
  
          .sign-up-form .col {
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
            placeholder="Name"
            type="text"
            onChange={nameChangeHandler}
            clearButton={setName}
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
          <Input
            placeholder="Reconfirm Password"
            type="password"
            onChange={reconfirmPasswordChangeHandler}
            clearButton={setReconfirmPassword}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            align="right"
            primary
            onClick={regstrationClickHandler}
          >
            Registration
          </Button>
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