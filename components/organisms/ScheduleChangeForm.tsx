import { Col, Row, useAccordionButton } from "react-bootstrap";
import { css } from "@emotion/react";
import { EventHandler, SyntheticEvent, useEffect, useRef, useState } from "react";
import { ScheduleType, UserType } from "@/services/firebase/firebase.type";
import { Button } from "../atoms/button/Button";
import { deleteScheduleData, updateScheduleData } from "@/services/firebase/db";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { reloadDataState, scheduleAccordionActiveState, showModalState, userInfoState } from "@/states/states";
import { getReformDate } from "@/services/util/util";
import { useMutation } from "@tanstack/react-query";
import { ScheduleInputForm } from "./ScheduleInputForm";
import { ScheduleInputType } from "@/types/global.types";

interface ScheduleChangeFromProps {
  beforeSchedule: ScheduleType
}

export const ScheduleChangeForm = ({
  beforeSchedule
}: ScheduleChangeFromProps) => {
  const [fromDate, setFromDate] = useState(beforeSchedule?.date.substring(0,10).replaceAll(".","-") as string);
  const [toDate, setToDate] = useState(beforeSchedule?.toDate?.substring(0,10).replaceAll(".","-") as string);
  const [schedule, setSchedule] = useState(beforeSchedule?.content as string);
  const [scheduleInput, setScheduleInput] = useState<ScheduleInputType>({
    fromDate: beforeSchedule?.date.substring(0,10).replaceAll(".","-") as string,
    toDate: beforeSchedule?.toDate?.substring(0,10).replaceAll(".","-") as string,
    schedule: beforeSchedule?.content as string
  });
  const userInfo = useRecoilValue<UserType>(userInfoState);
  const setShowModal = useSetRecoilState(showModalState);
  const [reloadData, setReloadData] = useRecoilState(reloadDataState);
  const closeAccordion = useAccordionButton(beforeSchedule?.id as string);
  const closeAccordionButtonRef = useRef<HTMLButtonElement>(null);
  const [scheduleAccordionActive, setScheduleAccordionActive] = useRecoilState(scheduleAccordionActiveState);

  useEffect(() => {
    if(beforeSchedule?.id as string === scheduleAccordionActive) {
      setScheduleAccordionActive("");
      closeAccordionButtonRef.current?.click();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadData]);
  
  const resetChange = () => {
    setFromDate(beforeSchedule?.date.substring(0,10).replaceAll(".","-") as string);
    setToDate(beforeSchedule?.toDate?.substring(0,10).replaceAll(".","-") as string);
    setSchedule(beforeSchedule?.content as string);
  }

  const changeScheduleMutation = useMutation(updateScheduleData, {
    onMutate: variable => {
      // console.log("onMutate", variable);
    },
    onError: (error, variable, context) => {
      // error
    },
    onSuccess: (data, variables, context) => {
      setScheduleAccordionActive("");
      setReloadData(true);
    },
    onSettled: () => {
      // console.log("end");
    }
  });

  const changeSchedule = (event: SyntheticEvent<any, Event>, eventHandler: EventHandler<SyntheticEvent<any, Event>>) => {
    if(schedule === "") {
      setShowModal({
        show: true,
        title: "알림",
        content: "내용을 입력하세요."
      });  
    } else if(fromDate === "" || toDate === "") {
      setShowModal({
        show: true,
        title: "알림",
        content: "날짜를 입력하세요."
      });
    } else {
      setShowModal({
        show: true,
        title: "알림",
        content: "정말 수정하시겠습니까?",
        confirm: () => {
          changeScheduleMutation.mutate({
            uid: userInfo?.uid as string,
            scheduleId: beforeSchedule?.id as string,
            newSchedule: {
              content: scheduleInput.schedule,
              date: getReformDate(scheduleInput.fromDate, "."),
              toDate: getReformDate(scheduleInput.toDate, ".")
            }
          });
          eventHandler(event);
        }
      });
    }
  }

  const deleteScheduleMutation = useMutation(deleteScheduleData, {
    onMutate: variable => {
      // console.log("onMutate", variable);
    },
    onError: (error, variable, context) => {
      // error
    },
    onSuccess: (data, variables, context) => {
      setScheduleAccordionActive("");
      setReloadData(true);
    },
    onSettled: () => {
      // console.log("end");
    }
  });

  const deleteSchedule = (event: SyntheticEvent<any, Event>, eventHandler: EventHandler<SyntheticEvent<any, Event>>) => {
    setShowModal({
      show: true,
      title: "경고",
      content: "정말 삭제하시겠습니까?",
      confirm: () => {
        deleteScheduleMutation.mutate({
          uid: userInfo?.uid as string,
          scheduleId: beforeSchedule?.id as string
        });
        eventHandler(event);
      }
    });
  }

  return (
    <>
      <ScheduleInputForm
        scheduleInput={scheduleInput}
        setScheduleInput={setScheduleInput}
      />
      <Row>
        <Col>
          <Button
            size="small"
            align="right"
            color="#5e5e5e"
            backgroundColor="#fefefe"
            onClick={resetChange}
          >
            Reset
          </Button>
        </Col>
        <Col>
          <Button
            size="small"
            align="right"
            color="#ffffff"
            backgroundColor="#8e8e8e"
            onClick={(e) => {
              changeSchedule(e, closeAccordion);
            }}
          >
            Change
          </Button>
        </Col>
        <Col>
          <Button
            size="small"
            align="right"
            color="#ffffff"
            backgroundColor="#ff7171"
            onClick={(e) => {
              deleteSchedule(e, closeAccordion);
            }}
          >
            Delete
          </Button>
        </Col>
      </Row>
      <div className="hidden-button">
        <Button
          btnRef={closeAccordionButtonRef}
          onClick={(e) => {
            closeAccordion(e);
          }}
        >
          close accordion
        </Button>
      </div>
    </>
  );
}