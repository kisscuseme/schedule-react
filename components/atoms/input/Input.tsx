import { InputProps } from "./input.props";
import { css } from "@emotion/react";
import { defaultStyle, innerBtnStyle, sizeStyles } from "./input.styles";
import { useRef, useState } from "react";

/**
 * 기본 인풋 컴포넌트
 */
export const Input = ({
  type = "text",
  size = "large",
  color = "#1e1e1e",
  borderColor = "#1e1e1e",
  placeholderColor = "#bbbbbb",
  placeholder = "",
  clearButton,
  onChange,
  ...props
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const customStyle = `
    color: ${color};
    &::placeholder {
      color: ${placeholderColor};
    }
    ${sizeStyles[size]}
  `;
  
  const borderStyle = `
    border-bottom: 1px solid ${borderColor};
    ${clearButton? "padding-right:20px" : ""}
  `;

  return (
    <div css={css(borderStyle)}>
      <input
        type={type}
        css={css([defaultStyle, customStyle])}
        placeholder={placeholder}
        ref={inputRef}
        onChange={(e) => {
          setValue(e.currentTarget.value);
          if (onChange) onChange(e);
        }}
        {...props}
      />
      {clearButton && type !== "date" && type !== "password" && value != "" && (
        <button
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = "";
              setValue("");
              clearButton("");
            }
          }}
          css={css([innerBtnStyle])}
        >
          X
        </button>
      )}
    </div>
  );
};
