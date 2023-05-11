import { Button } from "@/components/atoms/button/Button";
import { Input } from "@/components/atoms/input/Input";
import { Text } from "@/components/atoms/text/Text";
import { css } from "@emotion/react";
import { Col, Container, Row } from "react-bootstrap";

export default function SignIn() {
  const topRowStyle = css`
    height: 100px !important;
  `;

  const topColStyle = css`
    margin: auto;
  `;

  return (
    <>
      <style>
        {`
          .container-fluid {
            background-color: #eeeeee;
            max-width: 768px;
          }

          .row {
            height: 70px;
          }
        `}
      </style>
      <Container fluid>
        <Row css={topRowStyle}>
          <Col css={topColStyle}>
            <Text as="h2" center>일정 관리</Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Input placeholder="Email" clearButton></Input>
          </Col>
        </Row>
        <Row>
          <Col>
            <Input placeholder="Password" type="password" clearButton></Input>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button align="right" primary>Sign In</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}
