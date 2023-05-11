import { Button as BootstrapButton } from 'react-bootstrap';
import { ButtonProps } from "./button.props";
import { defaultStyle, sizeStyles } from './button.styles';
import { css } from '@emotion/react';

/**
 * 기본 버튼 컴포넌트
 */
export const Button = ({
  primary = false,
  size = "medium",
  backgroundColor = "transparent",
  color = "#aeaeae",
  children,
  align = "none",
  ...props
}: ButtonProps) => {

  if(primary) {
    backgroundColor = "#eeeeee";
    color = "#1e1e1e";
  }

  const customStyle = `
    color: ${color};
    background-color: ${backgroundColor};
    &:hover {
      color: ${backgroundColor === 'transparent'?'#ffffff':backgroundColor};
      background-color: ${color};
    }
    ${sizeStyles[size]}
  `;

  const btnPrimaryStyle = `
    --bs-btn-color: ${color};
    --bs-btn-bg: ${backgroundColor};
    --bs-btn-border-color: ${backgroundColor};
    --bs-btn-hover-color: ${color};
    --bs-btn-hover-bg: ${backgroundColor};
    --bs-btn-hover-border-color: ${backgroundColor};
    --bs-btn-focus-shadow-rgb: 49,132,253;
    --bs-btn-active-color: ${color};
    --bs-btn-active-bg: ${backgroundColor};
    --bs-btn-active-border-color: ${backgroundColor};
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: ${color};
    --bs-btn-disabled-bg: ${backgroundColor};
    --bs-btn-disabled-border-color: ${backgroundColor};
  `;

  const parentStyle = `
    display: inline-block;
    margin: 5px;
    ${align === "center" ? "width:100%;text-align:center;" : ("float: " + align)}
  `;

  return (
    <>
      <div css={css(parentStyle)}>
        <BootstrapButton
          css={css([defaultStyle, customStyle, btnPrimaryStyle])}
          {...props}
        >
          {children}
        </BootstrapButton>
      </div>
    </>
  );
};
