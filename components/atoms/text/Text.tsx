import React from "react";
import { TextProps } from "./text.props";
import { defaultStyle, sizeStyles } from "./text.styles";
import { css } from "@emotion/react";

/**
 * 기본 텍스트 컴포넌트
 */
export const Text = <E extends React.ElementType>({
  size = "medium",
  children,
  as,
  color,
  center,
  ...props
}: TextProps<E>) => {
  const Component = as || 'div';
  
  const textStyles = [defaultStyle];

  if(color) {
    const colorStyle = css`color: ${color}`;
    textStyles.push(colorStyle);
  }

  if(['h1','h2','h3','h4','h5','h6'].indexOf(as as string) < 0) {
    const sizeStyle = css`${sizeStyles[size]}`;
    textStyles.push(sizeStyle);
  }

  if(center) {
    const centerStyle = css`text-align: center;`;
    textStyles.push(centerStyle);
  }

  return (
    <Component
      css={css(textStyles)}
      {...props}
    >
      {children}
    </Component>
  );
};
