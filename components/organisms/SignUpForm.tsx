import { Col, Row } from "react-bootstrap";
import { Input } from "../atoms/input/Input";
import { Button } from "../atoms/button/Button";
import { ChangeEvent, useState } from "react";
import { checkEmail, checkPassword } from "@/services/util/util";
import { useRouter } from "next/router";
import { Text } from "../atoms/text/Text";
import { signUp } from "@/services/firebase/auth";

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
      setErrorMsg("");
      const result = await signUp(email, password);
      if(typeof result !== 'string') {
        setEmail("");
        setPassword("");
        alert("회원 가입을 축하합니다.");
        router.replace('/schedule');
      } else {
        setErrorMsg(result);
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