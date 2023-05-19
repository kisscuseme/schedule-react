import { Container } from "@/components/atoms/container/Container";
import { s } from "@/services/util/util";
import { showModalState } from "@/states/states";
import { t } from "i18next";
import { useRecoilValue } from "recoil";
import { Alert } from "../molecules/alert/Alert";
import { Title } from "../molecules/title/Title";
import { SignInForm } from "../organisms/SignInForm";
import { TopBar } from "../molecules/topBar/topBar";
import { Col } from "react-bootstrap";
import { LanguageSelector } from "../organisms/LanguageSelector";
import { css } from "@emotion/react";
import { topColStyle } from "../molecules/topBar/topBar.styles";

export default function SignIn() {
  const showModal = useRecoilValue(showModalState);
  return (
    <>
      <Container>
        <TopBar>
          <Col css={css(topColStyle)}>
            <LanguageSelector/>
          </Col>
        </TopBar>
        <Title>
          {s(t("Schedule Management"))}
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
