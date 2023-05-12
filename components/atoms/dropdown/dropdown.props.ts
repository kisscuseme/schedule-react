import { DropdownProps as BootstrapDropdownProps } from 'react-bootstrap';

interface DropdownOwnProps {
  /**
   * 배경 색상
   */
  backgroundColor?: string;
  /**
   * 글자 색상
   */
  color?: string;
  /**
   * 크기
   */
  size?: "small" | "medium" | "large";
  /**
   * 초기 텍스트
   */
  initText: string;
  /**
   * ID
   */
  id?: string;
  /**
   * 데이터
   */
  items: DropdownDataProps[];
  /**
   * Dropdown 위치
   */
  align?: "left" | "center" | "right" | "none";
  /**
   * Dropdown Click Item Handler
   */
  onClickItemHandler: (label: string) => void;
}

export type DropdownProps = DropdownOwnProps & Omit<BootstrapDropdownProps, "align" | "children">;

export type DropdownDataProps = {
  key: string;
  href: string;
  label: string;
}