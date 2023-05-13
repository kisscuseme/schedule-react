import { Container } from "@/components/atoms/container/Container";
import { Title } from "@/components/molecules/Title";
import { SignUpForm } from "@/components/organisms/SignUpForm";
export default function SignUp() {
  return (
    <Container>
      <Title>
        회원 가입
      </Title>
      <SignUpForm/>
    </Container>
  );
}
