export interface InputProps {
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
   * onChange Handler
   */
  onChange?: () => {};
  /**
   * onClick Handler
   */
  clearButton?: boolean;
}
