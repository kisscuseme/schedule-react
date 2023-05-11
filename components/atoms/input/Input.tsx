import { InputProps } from "./input.props";
import { css } from "@emotion/react";
import { defaultStyle, innerBtnStyle, sizeStyles } from "./input.styles";
import { useEffect, useRef, useState } from "react";

/**
 * 기본 인풋 컴포넌트
 */
export const Input = ({
  type = "text",
  size = "medium",
  color = "#1e1e1e",
  borderColor = "#1e1e1e",
  placeholderColor = "#bbbbbb",
  placeholder = "",
  clearButton,
  ...props
}: InputProps) => {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const customStyle = `
    color: ${color};
    border-bottom: 1px solid ${borderColor};
    &::placeholder {
      color: ${placeholderColor};
    }
    ${sizeStyles[size]}
  `;

  return (
  <>
    <input
      type={type}
      css={css([defaultStyle, customStyle])}
      placeholder={placeholder}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      ref={inputRef}
      {...props}
    />
    {clearButton && value !== "" && <button onClick={()=>{
      if(inputRef.current) {
        inputRef.current.value = "";
        setValue("");
      }
    }} css={css(innerBtnStyle)}>X</button>}
    
  </>
  );
};
