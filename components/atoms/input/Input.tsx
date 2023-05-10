import { InputProps } from "./input.props";
import { css } from "@emotion/react";
import { defaultStyle, sizeStyles } from "./input.styles";

/**
 * 기본 인풋 컴포넌트
 */
export const Input = ({
  size = "medium",
  color,
  placeholder,
  placeholderColor,
  borderColor,
  ...props
}: InputProps) => {
  
  const colorStyle = css`color: ${color ? color : '#1e1e1e'}`;
  const borderStyle = css`border-bottom: 1px solid ${borderColor ? borderColor : '#1e1e1e'}`;
  const placeholderStyle = css`&::placeholder {color: ${placeholderColor ? placeholderColor : '#cccccc'}}`;
  const sizeStyle = css`${sizeStyles[size]}`;

  return (<input
    type="text"
    css={css([defaultStyle, colorStyle, borderStyle, placeholderStyle, sizeStyle])}
    placeholder={placeholder}
    {...props}
  />);
};
