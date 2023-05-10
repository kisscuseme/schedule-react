import { Text } from "@/components/atoms/text/Text";
import { css } from "@emotion/react";
import { Col, Container, Row } from "react-bootstrap";

export default function SignIn() {
  return (
    <Container fluid css={css`background-color: #eeeeee; max-width: 768px;`}>
      <Row css={css`height: 100px;`}>
        <Col css={css`margin: auto;`}>
          <Text as="h2" center>일정 관리</Text>
        </Col>
      </Row>
    </Container>
  )
}
