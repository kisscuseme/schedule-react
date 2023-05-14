import { Col, Row, useAccordionButton } from "react-bootstrap";
import { Input } from "../atoms/input/Input";
import { css } from "@emotion/react";
import { ChangeEvent, EventHandler, SyntheticEvent, useEffect, useRef, useState } from "react";
import { ScheduleType, UserType } from "@/services/firebase/firebase.type";
import { Button } from "../atoms/button/Button";
import { deleteScheduleData, updateScheduleData } from "@/services/firebase/db";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { reloadDataState, scheduleAccordionActiveState, showModalState, userInfoState } from "@/states/states";
import { getReformDate } from "@/services/util/util";
import { useMutation } from "@tanstack/react-query";

interface ScheduleChangeFromProps {
  beforeSchedule: ScheduleType
}

export const ScheduleChangeForm = ({
  beforeSchedule
}: ScheduleChangeFromProps) => {
  const [fromDate, setFromdate] = useState(beforeSchedule?.date.substring(0,10).replaceAll(".","-") as string);
  const [toDate, setTodate] = useState(beforeSchedule?.toDate?.substring(0,10).replaceAll(".","-") as string);
  const [schedule, setSchedule] = useState(beforeSchedule?.content as string);
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
  
  const selectFromDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if(toDate < e.currentTarget.value) setFromdate(toDate);
    else setFromdate(e.currentTarget.value);
  }

  const selectToDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if(fromDate > e.currentTarget.value) setTodate(fromDate);
    else setTodate(e.currentTarget.value);
  }

  const scheduleInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSchedule(e.currentTarget.value);
  }

  const resetChange = () => {
    setFromdate(beforeSchedule?.date.substring(0,10).replaceAll(".","-") as string);
    setTodate(beforeSchedule?.toDate?.substring(0,10).replaceAll(".","-") as string);
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
      setShowModal({
        show: true,
        title: "알림",
        content: "수정이 완료되었습니다.",
        callback: () => {
          setScheduleAccordionActive("");
          setReloadData(true);
        }
      });
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
              content: schedule,
              date: getReformDate(fromDate, "."),
              toDate: getReformDate(toDate, ".")
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
      setShowModal({
        show: true,
        title: "알림",
        content: "삭제가 완료되었습니다.",
        callback: () => {
          setScheduleAccordionActive("");
          setReloadData(true);
        }
      });
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

  const dateMiddleStyle = `
    max-width: 30px;
    margin-left: -3px !important;
  `;

  return (
    <div className="schedule-input-form">
      <style>
        {`
          .schedule-input-form .row {
            min-height: 50px;
          }
  
          .schedule-input-form .col {
            margin: auto;
          }
        `}
      </style>
      <Row>
        <Col>
          <Input
            type="date"
            value={fromDate}
            onChange={selectFromDateHandler}
          />
        </Col>
        <Col css={css(dateMiddleStyle)}>~</Col>
        <Col>
          <Input type="date" value={toDate} onChange={selectToDateHandler} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            placeholder=""
            type="text"
            value={schedule}
            onChange={scheduleInputHandler}
            clearButton={setSchedule}
          />
        </Col>
      </Row>
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
      <Button
        btnRef={closeAccordionButtonRef}
        onClick={(e) => {
          closeAccordion(e);
        }}
        css={css(`display: none;`)}
      >
        close accordion
      </Button>
    </div>
  );
}