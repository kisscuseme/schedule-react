import { ModalProps } from "react-bootstrap";

interface AlertOwnProps {
  /**
   * title
   */
  title?: string;
  /**
   * content
   */
  content?: React.ReactNode;
  /**
   * callback
   */
  callback?: () => void;
  /**
   * confirm
   */
  confirm?: () => void;
};

export type AlertProps = AlertOwnProps & ModalProps;