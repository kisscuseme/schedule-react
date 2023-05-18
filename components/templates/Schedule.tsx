import { Container } from "@/components/atoms/container/Container";
import { ScheduleAddForm } from "@/components/organisms/ScheduleAddForm";
import { ScheduleList } from "@/components/organisms/ScheduleList";
import { ScheduleTopBar } from "@/components/organisms/ScheduleTopBar";
import { showModalState } from "@/states/states";
import { useRecoilValue } from "recoil";
import { Alert } from "../molecules/alert/Alert";
import { DivisionLine } from "../molecules/divideLine/DivisionLine";

export default function Schedule() {
  const showModal = useRecoilValue(showModalState);

  return (
    <>
      <Container>
        <ScheduleTopBar/>
        <ScheduleAddForm/>
        <DivisionLine/>
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