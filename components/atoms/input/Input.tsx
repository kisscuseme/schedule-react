import { InputProps } from "./input.props";
import { css } from "@emotion/react";
import { defaultStyle, innerBtnStyle, sizeStyles } from "./input.styles";
import { useRef } from "react";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const customStyle = `
    color: ${color};
    border-bottom: 1px solid ${borderColor};
    &::placeholder {
      color: ${placeholderColor};
    }
    ${sizeStyles[size]}
  `;
  
  const innerBtnMarginStyle = type === 'date' ? `margin-left: -40px;` : `margin-left: -20px;`;

  return (
  <>
    <input
      type={type}
      css={css([defaultStyle, customStyle])}
      placeholder={placeholder}
      ref={inputRef}
      {...props}
    />
    {clearButton && <button onClick={()=>{
      if(inputRef.current) {
        inputRef.current.value = "";
      }
    }} css={css([innerBtnStyle, innerBtnMarginStyle])}>X</button>}
    
  </>
  );
};
