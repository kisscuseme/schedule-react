import { Container } from "@/components/atoms/container/Container";
import { SignInForm } from "@/components/organisms/SignInForm";
import { showModalState } from "@/states/states";
import { useRecoilValue } from "recoil";
import { Alert } from "../molecules/alert/Alert";
import { Title } from "../molecules/title/Title";

export default function SignInTemplate() {
  const showModal = useRecoilValue(showModalState);

  return (
    <>
      <Container>
        <Title>
          일정 관리
        </Title>
        <SignInForm/>
      </Container>
      <Alert
        title={showModal.title}
        content={showModal.content}
        show={showModal.show}
        callback={showModal.callback}
        confirm={showModal.confirm}
      />
    </>
  );
}
