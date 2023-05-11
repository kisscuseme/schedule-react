import { css } from "@emotion/react";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { Text } from "../atoms/text/Text";

type TitleProps = {
  children: React.ReactNode;
}

export const Title = ({
  children
}: TitleProps) => {
  const topRowStyle = css`
    height: 150px !important;
  `;

  const topColStyle = css`
    margin: auto;
  `;

  return (
    <Row css={topRowStyle}>
      <Col css={topColStyle}>
        <Text as="h2" center>{children}</Text>
      </Col>
    </Row>
  )
}