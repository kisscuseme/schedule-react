import { Col, Row } from "react-bootstrap";
import { Input } from "../atoms/input/Input";
import { Button } from "../atoms/button/Button";

export const SignUpForm = () => {
  const regstrationClickHandler = () => {
    alert("Sign Up 구현 예정");
  }

  return (
    <div className="sign-up-form">
      <style>
        {`
          .sign-up-form .row {
            min-height: 70px;
          }
  
          .sign-up-form .col {
            margin: auto;
          }
        `}
      </style>
      <Row>
        <Col>
          <Input placeholder="Email" type="email" clearButton></Input>
        </Col>
      </Row>
      <Row>
        <Col>
          <Input placeholder="Name" type="text" clearButton></Input>
        </Col>
      </Row>
      <Row>
        <Col>
          <Input placeholder="Password" type="password" clearButton></Input>
        </Col>
      </Row>
      <Row>
        <Col>
          <Input placeholder="Reconfirm Password" type="password" clearButton></Input>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button align="right" primary onClick={regstrationClickHandler}>
            Registrantion
          </Button>
        </Col>
      </Row>
    </div>
  )
}