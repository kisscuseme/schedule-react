import React from "react";
import { TextProps } from "./text.props";
import { defaultStyle, sizeStyles } from "./text.styles";
import { css } from "@emotion/react";

/**
 * 기본 텍스트 컴포넌트
 */
export const Text = <E extends React.ElementType>({
  size = "large",
  children,
  as,
  color = "#000000",
  align = "none",
  ...props
}: TextProps<E>) => {
  const Component = as || 'div';
  const colorStyle = `color: ${color}`;
  const centerStyle = align === "center" ? "width:100%;text-align:center;" : ("float: " + align);
  const customStyle = [colorStyle, centerStyle];

  if(['h1','h2','h3','h4','h5','h6'].indexOf(as as string) < 0) {
    const sizeStyle = `${sizeStyles[size]}`;
    customStyle.push(sizeStyle);
  }
  
  if(['a'].indexOf(as as string) > -1) {
    const hoverStyle = `
      cursor: pointer;
      &:hover {
        color: #6e6e6e;
      }
    `;
    customStyle.push(hoverStyle);
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
