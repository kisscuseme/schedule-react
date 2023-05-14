import { RefObject } from "react";
import { AccordionProps } from "react-bootstrap";
import { AccordionItemProps } from "react-bootstrap/esm/AccordionItem";

interface AccordionParentOwnProps {
  /**
   * Accordion child
   */
  children: React.ReactNode;
};

interface AccordionChildOwnProps {
  /**
   * id
   */
  dataId: string;
  /**
   * 헤더 컨텐츠
   */
  headerContent: React.ReactNode;
  /**
   * 바디 컨텐츠
   */
  bodyContent: React.ReactNode;
  /**
   * headerClickHandler
   */
  headerClickHandler?: () => void;
}

export type AccordionParentProps = AccordionParentOwnProps & AccordionProps;
export type AccordionChildProps = AccordionChildOwnProps & Omit<AccordionItemProps, "eventKey">;