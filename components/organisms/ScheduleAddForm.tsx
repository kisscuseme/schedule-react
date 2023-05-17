import { Col, Row } from "react-bootstrap";
import { Button } from "../atoms/button/Button";
import { useRef, useState } from "react";
import { getReformDate, getToday } from "@/services/util/util";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { reloadDataState, showModalState, userInfoState } from "@/states/states";
import { useMutation } from "@tanstack/react-query";
import { insertScheduleData } from "@/services/firebase/db";
import { UserType } from "@/services/firebase/firebase.type";
import { ScheduleInputForm } from "./ScheduleInputForm";
import { ScheduleInputType } from "@/types/global.types";

export const ScheduleAddForm = () => {
  const setShowModal = useSetRecoilState(showModalState);
  const setReloadData = useSetRecoilState(reloadDataState);
  const userInfo = useRecoilValue<UserType>(userInfoState);
  const scheduleClearBtnRef = useRef<HTMLButtonElement>(null);
  const [scheduleInput, setScheduleInput] = useState<ScheduleInputType>({
    fromDate: getToday(),
    toDate: getToday(),
    schedule: ""
  });

  const insertScheduleMutation = useMutation(insertScheduleData, {
    onMutate: variable => {
      // console.log("onMutate", variable);
    },
    onError: (error, variable, context) => {
      // error
    },
    onSuccess: (data, variables, context) => {
      setScheduleInput({
        fromDate: getToday(),
        toDate: getToday(),
        schedule: ""
      });
      console.log(scheduleClearBtnRef);
      if(scheduleClearBtnRef.current) scheduleClearBtnRef.current.click();
      setReloadData(true);
    },
    onSettled: () => {
      // console.log("end");
    }
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