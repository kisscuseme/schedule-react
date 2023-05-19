import { InputProps } from "./input.props";
import { css } from "@emotion/react";
import { defaultStyle, innerBtnStyle, sizeStyles } from "./input.styles";
import { useEffect, useRef, useState } from "react";

/**
 * 기본 인풋 컴포넌트
 */
export const Input = ({
  type = "text",
  size = "large",
  color = "#1e1e1e",
  borderColor = "#1e1e1e",
  placeholderColor = "#aeaeae",
  placeholder = "",
  clearButton,
  onChange,
  ref,
  clearBtnRef,
  initValue,
  onClearButtonClick,
  ...props
}: InputProps) => {
  const [text, setText] = useState(initValue||"");

  const customStyle = `
    color: ${color};
    &::placeholder {
      color: ${placeholderColor};
    }
    ${sizeStyles[size]}
  `;
  
  const borderStyle = `
    border-bottom: 1px solid ${borderColor};
    ${clearButton? "padding-right:15px" : ""}
  `;

  return (
    <div css={css(borderStyle)}>
      <input
        type={type}
        css={css([defaultStyle, customStyle])}
        placeholder={placeholder}
        ref={ref}
        onChange={(e) => {
          setText(e.currentTarget.value);
          if(onChange) onChange(e);
        }}
        value = {text}
        {...props}
      />
      {clearButton && type !== "date" && text !== "" && (
        <button
          css={css([innerBtnStyle])}
          tabIndex={-1}
          ref={clearBtnRef}
          onClick={() => {
            setText("");
            if(onClearButtonClick) onClearButtonClick();
          }}
        >
          X
        </button>
      )}
    </div>
  );
};
