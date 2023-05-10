export interface ButtonProps {
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
   * 버튼 텍스트
   */
  label: string;
}
