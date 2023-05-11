import { Button } from "@/components/atoms/button/Button";
import { Input } from "@/components/atoms/input/Input";
import { Container } from "@/components/molecules/Container";
import { Title } from "@/components/molecules/title";
import { css } from "@emotion/react";
import { Col, Row } from "react-bootstrap";

export default function SignIn() {
  const groupBtnStyle = css`
    width: 100%;
    text-align: center;
  `;

  return (
    <Container>
      <Title>
        일정 관리
      </Title>
      <Row>
        <Col>
          <Input placeholder="Email" type="email" clearButton></Input>
        </Col>
      </Row>
      <Row>
        <Col>
          <Input placeholder="Password" type="password" clearButton></Input>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button align="right" primary>
            Sign In
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <div css={groupBtnStyle}>
            <Button>Find Password</Button>
            <Button>Sign Up</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
