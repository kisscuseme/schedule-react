import { Container } from "@/components/atoms/container/Container";
import { SignInForm } from "@/components/organisms/SignInForm";
import { Title } from "../molecules/title/Title";

export default function SignIn() {
  return (
    <Container>
      <Title>
        일정 관리
      </Title>
      <SignInForm/>
    </Container>
  );
}
