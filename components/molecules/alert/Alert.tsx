import { showModalState } from "@/states/states";
import { css } from "@emotion/react";
import { Modal } from "react-bootstrap";
import { useSetRecoilState } from "recoil";
import { Button } from "../../atoms/button/Button";
import { AlertProps } from "./alert.props";
import { defaultStyle, titleStyle } from "./alert.styles";

export const Alert = ({
  title,
  content,
  callback,
  show,
  confirm,
  ...props
}: AlertProps) => {
  const setShowModal = useSetRecoilState(showModalState);
  return (
    <Modal
      {...props}
      css={css(defaultStyle)}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" css={css(titleStyle)}>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {content}
      </Modal.Body>
      <Modal.Footer>
        {confirm && <Button
          backgroundColor="#8e8e8e"
          color="#ffffff"
          onClick={() => {
            setShowModal({
              title: "",
              content: "",
              callback: undefined,
              show: false
            });
            confirm();
          }}
        >
          Confirm
        </Button>}
        <Button
          primary
          onClick={() => {
            setShowModal({
              title: "",
              content: "",
              callback: undefined,
              show: false
            });
            if(callback) callback();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}