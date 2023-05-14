import { Container } from "@/components/atoms/container/Container";
import { css } from "@emotion/react";
import { Col, Row, Spinner } from "react-bootstrap"
import { colStyle, rowStyle } from "./loadingScreen.styles";

export const LoadingScreen = () => {
  return (
    <Container>
      <Row css={css(rowStyle)}>
        <Col css={css(colStyle)}>
          <Spinner animation="border"/>
        </Col>
      </Row>
    </Container>
  )
}