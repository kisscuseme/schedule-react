import { RefObject } from 'react';
import { ButtonProps as BootstrapButtonProps } from 'react-bootstrap';

interface ButtonOwnProps {
  /**
   * 주요 버튼 여부
   */
  primary?: boolean;
  /**
   * 버튼 배경 색상
   */
  backgroundColor?: string;
  /**
   * 버튼 글자 색상
   */
  color?: string;
  /**
   * 버튼 크기
   */
  size?: "small" | "medium" | "large";
  /**
   * 버튼 위치
   */
  align?: "left" | "center" | "right" | "none";
  /**
   * 버튼 Ref
   */
  btnRef?: RefObject<HTMLButtonElement>;
}

export type ButtonProps = ButtonOwnProps & Omit<BootstrapButtonProps, "size">