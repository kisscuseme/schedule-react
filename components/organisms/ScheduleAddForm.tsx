import { Col, Row } from "react-bootstrap";
import { Button } from "../atoms/button/Button";
import { useState } from "react";
import { getReformDate, getToday, s } from "@/services/util/util";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { reloadDataState, showModalState, userInfoState } from "@/states/states";
import { insertScheduleData } from "@/services/firebase/db";
import { UserType } from "@/services/firebase/firebase.type";
import { ScheduleInputForm } from "./ScheduleInputForm";
import { ScheduleInputType } from "@/types/global.types";
import { useMutation } from "@tanstack/react-query";
import { t } from "i18next";

export const ScheduleAddForm = () => {
  const setShowModal = useSetRecoilState(showModalState);
  const setReloadData = useSetRecoilState(reloadDataState);
  const userInfo = useRecoilValue<UserType>(userInfoState);
  const [scheduleInput, setScheduleInput] = useState<ScheduleInputType>({
    fromDate: getToday(),
    toDate: getToday(),
    schedule: ""
  });

  const insertScheduleMutation = useMutation(insertScheduleData, {
    onSuccess() {
      setScheduleInput({
        fromDate: getToday(),
        toDate: getToday(),
        schedule: ""
      });
      setReloadData(true);
    }
  });

  const changeSchedule = () => {
    if(scheduleInput.schedule === "") {
      setShowModal({
        show: true,
        title: s(t('Check')),
        content: s(t('Please enter your content.'))
      });  
    } else if(scheduleInput.fromDate === "" || scheduleInput.toDate === "") {
      setShowModal({
        show: true,
        title: s(t('Check')),
        content: s(t('Please enter a date.'))
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
        scheduleInputPlaceholder={s(t("Enter your schedule."))}
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
            {s(t("Add"))}
          </Button>
        </Col>
      </Row>
    </>
  )
}