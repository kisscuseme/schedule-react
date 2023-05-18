import { Container } from "@/components/atoms/container/Container";
import { ScheduleAddForm } from "@/components/organisms/ScheduleAddForm";
import { ScheduleList } from "@/components/organisms/ScheduleList";
import { ScheduleTopBar } from "@/components/organisms/ScheduleTopBar";
import { showModalState } from "@/states/states";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { Alert } from "../molecules/alert/Alert";

export default function Schedule() {
  const showModal = useRecoilValue(showModalState);

  const divideStyle = `
    border-top: 1px #ffffff solid;
    margin: 5px;
  `;

  return (
    <>
      <Container>
        <ScheduleTopBar/>
        <ScheduleAddForm/>
        <div css={css(divideStyle)}></div>
        <ScheduleList/>
      </Container>
      <Alert
        title={showModal.title}
        content={showModal.content}
        show={showModal.show}
        callback={showModal.callback}
        confirm={showModal.confirm}
      />
    </>
  );
}