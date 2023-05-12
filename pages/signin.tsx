import { Container } from "@/components/molecules/Container";
import { Title } from "@/components/molecules/Title";
import { ScheduleTopBar } from "@/components/organisms/ScheduleTopBar";
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
