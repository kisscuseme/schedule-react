import { css } from "@emotion/react";
import { ReactNode } from "react";
import { Row } from "react-bootstrap";
import { topRowStyle } from "./topBar.styles";

export const TopBar = ({
  children
}: { children: ReactNode }) => {
  return (
    <Row css={css(topRowStyle)}>
      {children}
    </Row>
  );
}