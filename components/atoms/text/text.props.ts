import React from "react";

interface TextOwnProps<E extends React.ElementType> {
  /**
   * 텍스트 타입
   */
  as?: E;
  /**
   * 글자 색상
   */
  color?: string;
  /**
   * 글자 크기
   */
  size?: "small" | "medium" | "large";
  /**
   * 중앙 정렬
   */
  center?: boolean;
  /**
   * 텍스트 내용
   */
  children: React.ReactNode;
}

export type TextProps<E extends React.ElementType> = TextOwnProps<E> & Omit<React.ComponentProps<E>, keyof TextOwnProps<E>>