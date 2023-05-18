import { Col, Row } from "react-bootstrap";
import { Input } from "../atoms/input/Input";
import { Button } from "../atoms/button/Button";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { checkEmail, checkPassword } from "@/services/util/util";
import { useRouter } from "next/router";
import { Text } from "../atoms/text/Text";
import { signUp } from "@/services/firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { showModalState } from "@/states/states";
import { sendEmailVerification, updateProfile, UserCredential } from "firebase/auth";

export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [reconfirmPassword, setReconfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const setShowModal = useSetRecoilState(showModalState);
  const router = useRouter();
  const emailClearButtonRef = useRef<HTMLButtonElement>(null);
  const nameClearButtonRef = useRef<HTMLButtonElement>(null);
  const passwordClearButtonRef = useRef<HTMLButtonElement>(null);
  const reconfirmPasswordClearButtonRef = useRef<HTMLButtonElement>(null);

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

  const signUpWithEmail = (loginInfo: {email: string, password: string}) => {
    return signUp(loginInfo.email, loginInfo.password);
  }

  const signUpMutation = useMutation(signUpWithEmail, {
    onMutate: variable => {
      // console.log("onMutate", variable);
    },
    onError: (error, variable, context) => {
      // error
    },
    onSuccess: async (data: UserCredential | string, variables, context) => {
      try {
        if(typeof data === "string") {
          setErrorMsg(data);
        } else {
          await updateProfile(data.user, {displayName: name});
          await sendEmailVerification(data.user);
          setShowModal({
            show: true,
            title: "알림",
            content: "거의 완료되었습니다. 발송된 인증 메일을 확인해 주세요.",
            callback: () => {
              setName("");
              setEmail("");
              setPassword("");
              setReconfirmPassword("");
              router.replace("/");
            }
          });
        }
      } catch(error: any) {
        console.log(error);
      }
    },
    onSettled: () => {
      // console.log("end");
    }
  });

  const signUpHandleSubmit = () => {
    if(email === "") {
      setErrorMsg("이메일을 입력해 주세요.");
    } else if(!checkEmail(email)) {
      setErrorMsg("이메일 형식을 확인해 주세요.");
    } else if(name === "") {
      setErrorMsg("이름을 입력해 주세요.");
    } else if(!checkPassword(password)) {
      setErrorMsg("비밀번호는 최소 6자리 이상 입력해 주세요.");
    } else if(password !== reconfirmPassword) {
      setErrorMsg("입력한 비밀번호가 동일하지 않습니다.");
    } else {
      setErrorMsg("");
      setShowModal({
        show: true,
        title: "알림",
        content: "회원 가입을 하시겠습니까?",
        confirm: () => {
          signUpMutation.mutate({ email: email, password });
        }
      });
    }
  };

  const enterKeyUpEventHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") {
      signUpHandleSubmit();
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
            clearButton={true}
            clearBtnRef={emailClearButtonRef}
            onClearButtonClick={() => {
              setEmail("");
            }}
            onKeyUp={enterKeyUpEventHandler}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            placeholder="Name"
            type="text"
            value={name}
            onChange={nameChangeHandler}
            clearButton={true}
            clearBtnRef={nameClearButtonRef}
            onClearButtonClick={() => {
              setName("");
            }}
            onKeyUp={enterKeyUpEventHandler}
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
          <Input
            placeholder="Reconfirm Password"
            type="password"
            value={reconfirmPassword}
            onChange={reconfirmPasswordChangeHandler}
            clearButton={true}
            clearBtnRef={reconfirmPasswordClearButtonRef}
            onClearButtonClick={() => {
              setReconfirmPassword("");
            }}
            onKeyUp={enterKeyUpEventHandler}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            align="right"
            primary
            onClick={signUpHandleSubmit}
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