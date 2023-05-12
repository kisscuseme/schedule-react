import { css } from "@emotion/react";
import React from "react";
import { Col, Row } from "react-bootstrap";

type TopBarProps = {
  children: React.ReactNode;
}

export const TopBar = ({
  children
}: TopBarProps) => {
  const topRowStyle = css`
    height: 70px !important;
  `;

  const topColStyle = css`
    margin: auto;
  `;

  return (
    <Row css={topRowStyle}>
      <Col css={topColStyle}>
        {children}
      </Col>
    </Row>
  )
}