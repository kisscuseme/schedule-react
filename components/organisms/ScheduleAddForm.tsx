import { Col, Row } from "react-bootstrap";
import { Button } from "../atoms/button/Button";
import { useState } from "react";
import { getReformDate, getToday, s, sortSchedulList } from "@/services/util/util";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { rerenderDataState, showModalState, userInfoState } from "@/states/states";
import { insertScheduleData } from "@/services/firebase/db";
import { ScheduleType, UserType } from "@/services/firebase/firebase.type";
import { ScheduleInputForm } from "./ScheduleInputForm";
import { ScheduleInputType } from "@/types/global.types";
import { useMutation } from "@tanstack/react-query";
import { t } from "i18next";
import { AccordionParent } from "../molecules/accordion/AccordionParent";
import { AccordionChild } from "../molecules/accordion/AccordionChild";
import { Text } from "../atoms/text/Text";

interface ScheduleAddFromProps {
  scheduleList: ScheduleType[]
}


export const ScheduleAddForm = ({
  scheduleList
}: ScheduleAddFromProps) => {
  const setShowModal = useSetRecoilState(showModalState);
  const [rerenderData, setRerenderDataState] = useRecoilState(rerenderDataState);
  const userInfo = useRecoilValue<UserType>(userInfoState);
  const [scheduleInput, setScheduleInput] = useState<ScheduleInputType>({
    fromDate: getToday(),
    toDate: getToday(),
    schedule: ""
  });

  const insertScheduleMutation = useMutation(insertScheduleData, {
    onSuccess(data) {
      scheduleList.push({
        id: data,
        date: getReformDate(scheduleInput.fromDate,"."),
        content: scheduleInput.schedule,
        toDate: getReformDate(scheduleInput.toDate,".")
      });
      setScheduleInput({
        fromDate: getToday(),
        toDate: getToday(),
        schedule: ""
      });
      scheduleList.sort(sortSchedulList);
      setRerenderDataState(!rerenderData);
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
        uid: userInfo?.uid||"",
        newSchedule: {
          content: scheduleInput.schedule,
          date: getReformDate(scheduleInput.fromDate, "."),
          toDate: getReformDate(scheduleInput.toDate, ".")
        }
      });
    }
  }

  return (
    <AccordionParent defaultActiveKey={"ScheduleAddForm"}>
      <AccordionChild
        dataId="ScheduleAddForm"
        headerContent={
          <Row>
            <Col>
              <Text color="#5f5f5f">{`[${s(t("Enter schedule"))}]`}</Text>
            </Col>
          </Row>
        }
        bodyContent={
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
        }
      >
      </AccordionChild>
    </AccordionParent>
  )
}