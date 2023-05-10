import { Input } from "@/components/atoms/input/Input";
import { Text } from "@/components/atoms/text/Text";
import { css } from "@emotion/react";
import { Col, Container, Form, FormControl, Row } from "react-bootstrap";

export default function SignIn() {
  const containerStyle = css`
    background-color: #eeeeee;
    max-width: 768px;
  `;

  const topRowStyle = css`
    height: 100px;
  `;

  const topColStyle = css`
    margin: auto;
  `;

  return (
    <Container fluid css={containerStyle}>
      <Row css={topRowStyle}>
        <Col css={topColStyle}>
          <Text as="h2" center>일정 관리</Text>
        </Col>
      </Row>
      <Row>
        <Col>
          <Input placeholder="Email" clearButton={true}></Input>
        </Col>
      </Row>
      <Row>
        <Col>
          <Input placeholder="Password" type="password"></Input>
        </Col>
      </Row>
    </Container>
  )
}
