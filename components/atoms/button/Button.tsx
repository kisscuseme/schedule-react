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
  backgroundColor,
  color,
  label,
  ...props
}: ButtonProps) => {
  const _color = color ? color : (primary ? '#1e1e1e' : '#6e6e6e');
  const _backgroundColor = backgroundColor ? backgroundColor : '#ffffff';

  const colorStyle = css`color: ${_color}`;
  const backgroundStyle = css`background-color: ${_backgroundColor}`;
  const hoverStyle = css`&:hover {color: ${_backgroundColor}; background-color: ${_color}}`;
  const sizeStyle = css`${sizeStyles[size]}`;

  return (
    <BootstrapButton
      css={css([defaultStyle, colorStyle, backgroundStyle, hoverStyle, sizeStyle])}
      {...props}
    >
      {label}
    </BootstrapButton>
  );
};
