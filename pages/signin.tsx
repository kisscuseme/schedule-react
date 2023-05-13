import { Container } from "@/components/atoms/container/Container";
import { Title } from "@/components/molecules/Title";
import { SignInForm } from "@/components/organisms/SignInForm";

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
