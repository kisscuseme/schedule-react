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
  const customStyle: string[] = [];

  if(color) {
    const colorStyle = `color: ${color}`;
    customStyle.push(colorStyle);
  }

  if(['h1','h2','h3','h4','h5','h6'].indexOf(as as string) < 0) {
    const sizeStyle = `${sizeStyles[size]}`;
    customStyle.push(sizeStyle);
  }

  if(center) {
    const centerStyle = `text-align: center;`;
    customStyle.push(centerStyle);
  }

  return (
    <Component
      css={css([defaultStyle, customStyle])}
      {...props}
    >
      {children}
    </Component>
  );
};
