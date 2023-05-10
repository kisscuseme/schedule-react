import { InputProps } from "./input.props";
import { css } from "@emotion/react";
import { defaultStyle, sizeStyles } from "./input.styles";
import { LegacyRef, useRef } from "react";

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
  onChange,
  clearButton,
  ...props
}: InputProps) => {
  const colorStyle = css`color: ${color}`;
  const borderStyle = css`border-bottom: 1px solid ${borderColor}`;
  const placeholderStyle = css`&::placeholder {color: ${placeholderColor}}`;
  const sizeStyle = css`${sizeStyles[size]}`;

  const inputRef = useRef<LegacyRef<HTMLInputElement>>();

  const innerBtnStyle = css`
    position: absolute;
    width: 10px;
    font-weight: 550;
    border: none;
    background-color: transparent;
    line-height: 35px;
    left: calc(100% - 30px);
    z-index: 99999;
    &:hover {
      color: blue;
    }
  `;  

  return (
  <>
    <input
      type={type}
      css={css([defaultStyle, colorStyle, borderStyle, placeholderStyle, sizeStyle])}
      placeholder={placeholder}
      onChange={onChange}
      ref={inputRef as LegacyRef<HTMLInputElement>}
      {...props}
    />
    {clearButton?<button onClick={()=>{
      if(inputRef.current !== null && inputRef.current !== undefined && typeof inputRef.current !== 'string') {
        console.log(inputRef.current);
      }
    }} css={innerBtnStyle}>X</button>:null}
    
  </>
  );
};
