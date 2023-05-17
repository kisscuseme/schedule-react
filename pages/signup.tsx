import { Container } from "@/components/atoms/container/Container";
import { Alert } from "@/components/molecules/alert/Alert";
import { Title } from "@/components/molecules/title/Title";
import { SignUpForm } from "@/components/organisms/SignUpForm";
import { showModalState } from "@/states/states";
import { useRecoilValue } from "recoil";

export default function SignUp() {
  const showModal = useRecoilValue(showModalState);

  return (
    <>
      <Container>
        <Title>
          회원 가입
        </Title>
        <SignUpForm/>
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
