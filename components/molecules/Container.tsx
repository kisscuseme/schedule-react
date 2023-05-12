import { css } from "@emotion/react";
import React from "react";
import { Container as BootstrapContainer } from "react-bootstrap";

type ContainerProps = {
  children: React.ReactNode;
}

export const Container = ({
  children
}: ContainerProps) => {
  const defaultStyle = `
    background-color: #eeeeee;
    max-width: 768px;
    height: 100vh;
    padding-left: 30px;
    padding-right: 30px;
  `;

  return (
    <>
      <BootstrapContainer fluid css={css(defaultStyle)}>
        {children}
      </BootstrapContainer>
    </>
  )
}