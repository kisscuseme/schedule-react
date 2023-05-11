import { css } from "@emotion/react";
import React from "react";
import { Container as BootstrapContainer } from "react-bootstrap";

type ContainerProps = {
  children: React.ReactNode;
}

export const Container = ({
  children
}: ContainerProps) => {
  const topRowStyle = css`
    height: 150px !important;
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
          height: 100vh;
          padding-left: 30px;
          padding-right: 30px;
        }

        .row {
          height: 70px;
        }

        .col {
          margin: auto;
        }
      `}
    </style>
      <BootstrapContainer fluid>
        {children}
      </BootstrapContainer>
    </>
  )
}