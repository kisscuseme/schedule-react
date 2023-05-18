import { Col, Row } from "react-bootstrap";
import { Button } from "../atoms/button/Button";
import { useState } from "react";
import { getReformDate, getToday } from "@/services/util/util";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { reloadDataState, showModalState, userInfoState } from "@/states/states";
import { insertScheduleData } from "@/services/firebase/db";
import { UserType } from "@/services/firebase/firebase.type";
import { ScheduleInputForm } from "./ScheduleInputForm";
import { ScheduleInputType } from "@/types/global.types";
import { doMutaion } from "@/services/util/simplify";

export const ScheduleAddForm = () => {
  const setShowModal = useSetRecoilState(showModalState);
  const setReloadData = useSetRecoilState(reloadDataState);
  const userInfo = useRecoilValue<UserType>(userInfoState);
  const [scheduleInput, setScheduleInput] = useState<ScheduleInputType>({
    fromDate: getToday(),
    toDate: getToday(),
    schedule: ""
  });

  const insertScheduleMutation = doMutaion(insertScheduleData, (data) => {
    setScheduleInput({
      fromDate: getToday(),
      toDate: getToday(),
      schedule: ""
    });
    setReloadData(true);
  });

  const changeSchedule = () => {
    if(scheduleInput.schedule === "") {
      setShowModal({
        show: true,
        title: "알림",
        content: "내용을 입력하세요."
      });  
    } else if(scheduleInput.fromDate === "" || scheduleInput.toDate === "") {
      setShowModal({
        show: true,
        title: "알림",
        content: "날짜를 입력하세요."
      });
    } else {
      insertScheduleMutation.mutate({
        uid: userInfo?.uid as string,
        newSchedule: {
          content: scheduleInput.schedule,
          date: getReformDate(scheduleInput.fromDate, "."),
          toDate: getReformDate(scheduleInput.toDate, ".")
        }
      });
    }
  }

  return (
    <>
      <ScheduleInputForm
        scheduleInput={scheduleInput}
        setScheduleInput={setScheduleInput}
        scheduleInputPlaceholder="Enter your schedule"
      />
      <Row>
        <Col>
          <Button
            align="right"
            backgroundColor="#3e3e3e"
            color="#fefefe"
            onClick={changeSchedule}
            size="small"
          >
            Add
          </Button>
        </Col>
      </Row>
    </>
  )
}