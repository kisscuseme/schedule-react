import { Col, Row } from "react-bootstrap";
import { Input } from "../atoms/input/Input";
import { Button } from "../atoms/button/Button";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { checkEmail, checkPassword, s } from "@/services/util/util";
import { useRouter } from "next/router";
import { Text } from "../atoms/text/Text";
import { signUp } from "@/services/firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { showModalState } from "@/states/states";
import { sendEmailVerification, updateProfile, UserCredential } from "firebase/auth";
import { t } from "i18next";

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

  useEffect(() => {
    if(password === "") {
      passwordClearButtonRef.current?.click();
    }
    if(email === "") {
      emailClearButtonRef.current?.click();
    }
    if(name === "") {
      nameClearButtonRef.current?.click();
    }
    if(reconfirmPassword === "") {
      reconfirmPasswordClearButtonRef.current?.click();
    }
  }, [password, email, name, reconfirmPassword]);

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
    onSuccess: async (data: UserCredential | string) => {
      try {
        if(typeof data === "string") {
          setErrorMsg(data);
        } else {
          await updateProfile(data.user, {displayName: name});
          await sendEmailVerification(data.user);
          localStorage.setItem("email", email);
          setShowModal({
            show: true,
            title: s(t("Check")),
            content: `${s(t("Your account creation is complete."))} ${s(t("Please check the verification e-mail sent."))}`,
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
    }
  });

  const signUpHandleSubmit = () => {
    if(email === "") {
      setErrorMsg(s(t("Please enter your e-mail.")));
    } else if(!checkEmail(email)) {
      setErrorMsg(s(t("Please check your e-mail format.")));
    } else if(name === "") {
      setErrorMsg(s(t("Enter your name, please.")));
    } else if(!checkPassword(password)) {
      setErrorMsg(s(t("Please enter a password of at least 6 digits.")));
    } else if(password !== reconfirmPassword) {
      setErrorMsg(s(t("The entered password and reconfirm password are not the same.")));
    } else {
      setErrorMsg("");
      setShowModal({
        show: true,
        title: s(t("Check")),
        content: s(t("Would you like to create an account?")),
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
            placeholder={s(t("E-mail"))}
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
            placeholder={s(t("Name"))}
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
          <Input
            placeholder={s(t("Reconfirm Password"))}
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
            {s(t("Create"))}
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