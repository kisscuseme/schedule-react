import { css } from "@emotion/react";
import { Container as BootstrapContainer } from "react-bootstrap";
import { ContainerProps } from "./container.props";
import { defaultStyle } from "./container.styles";

export const Container = ({
  children
}: ContainerProps) => {
  return (
    <BootstrapContainer fluid css={css(defaultStyle)}>
      {children}
    </BootstrapContainer>
  )
}