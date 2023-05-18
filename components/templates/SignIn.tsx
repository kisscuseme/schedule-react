import { Container } from "@/components/atoms/container/Container";
import { s } from "@/services/util/util";
import { showModalState } from "@/states/states";
import { t } from "i18next";
import { useRecoilValue } from "recoil";
import { Alert } from "../molecules/alert/Alert";
import { Title } from "../molecules/title/Title";
import { LanguageSelector } from "../organisms/LanguageSelector";
import { SignInForm } from "../organisms/SignInForm";

export default function SignIn() {
  const showModal = useRecoilValue(showModalState);
  return (
    <>
      <Container>
        <Title>
          {s(t("Schedule Management"))}
        </Title>
        <SignInForm/>
        <LanguageSelector/>
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
