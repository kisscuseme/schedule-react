import { ChangeEventHandler, Dispatch, HTMLProps, SetStateAction } from "react";

interface InputOwnProps {
  /**
   * 타입
   */
  type?: string;
  /**
   * 글자 색상
   */
  color?: string;
  /**
   * 글자 크기
   */
  size?: "small" | "medium" | "large";
  /**
   * Placeholder 텍스트
   */
  placeholder?: string;
  /**
   * Placeholder 글자 색상
   */
  placeholderColor?: string;
  /**
   * 라인 색상
   */
  borderColor?: string;
  /**
   * 클리어 버튼 수행 시 적용할 setState
   */
  clearButton?: Dispatch<SetStateAction<string>>;
  /**
   * onChange Handler
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export type InputProps = InputOwnProps & Omit<HTMLProps<HTMLInputElement>, "size">