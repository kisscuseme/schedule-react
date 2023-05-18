import { s } from "@/services/util/util";
import { showModalState } from "@/states/states";
import { css } from "@emotion/react";
import { t } from "i18next";
import { Modal } from "react-bootstrap";
import { useSetRecoilState } from "recoil";
import { Button } from "../../atoms/button/Button";
import { AlertProps } from "./alert.props";
import { defaultStyle, titleStyle } from "./alert.styles";

export const Alert = ({
  show,
  title,
  content,
  callback,
  confirm,
  ...props
}: AlertProps) => {
  const setShowModal = useSetRecoilState(showModalState);
  if(!show) {
    title = "";
    content = "";
    callback = undefined;
    confirm = undefined;
  }
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
            if(confirm) confirm();
            setShowModal({
              title: "",
              content: "",
              callback: undefined,
              confirm: undefined,
              show: false
            });
            
          }}
        >
          {s(t("Confirm"))}
        </Button>}
        <Button
          primary
          onClick={() => {
            if(callback) callback();
            setShowModal({
              title: "",
              content: "",
              callback: undefined,
              confirm: undefined,
              show: false
            });
            
          }}
        >
          {s(t("Close"))}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}