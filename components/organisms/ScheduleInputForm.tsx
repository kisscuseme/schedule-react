import { Col, Row } from "react-bootstrap";
import { Input } from "../atoms/input/Input";
import { Button } from "../atoms/button/Button";
import { css } from "@emotion/react";
import { ChangeEvent, useState } from "react";
import { getReformDate, getToday } from "@/services/util/util";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { reloadDataState, showModalState, userInfoState } from "@/states/states";
import { useMutation } from "@tanstack/react-query";
import { insertScheduleData } from "@/services/firebase/db";
import { UserType } from "@/services/firebase/firebase.type";

export const ScheduleInputForm = () => {
  const [fromDate, setFromdate] = useState(getToday());
  const [toDate, setTodate] = useState(getToday());
  const [schedule, setSchedule] = useState("");
  const [showModal, setShowModal] = useRecoilState(showModalState);
  const setReloadData = useSetRecoilState(reloadDataState);
  const userInfo = useRecoilValue<UserType>(userInfoState);

  const insertScheduleMutation = useMutation(insertScheduleData, {
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
        content: "입력이 완료되었습니다.",
        callback: () => {
          setReloadData(true);
        }
      });
    },
    onSettled: () => {
      // console.log("end");
    }
  });

  const changeSchedule = () => {
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
        content: "입력하시겠습니까?",
        confirm: () => {
          insertScheduleMutation.mutate({
            uid: userInfo?.uid as string,
            newSchedule: {
              content: schedule,
              date: getReformDate(fromDate, "."),
              toDate: getReformDate(toDate, ".")
            }
          });
        }
      });
    }
  }

  const selectFromDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if(toDate < e.currentTarget.value) setFromdate(toDate);
    else setFromdate(e.currentTarget.value);
  }

  const selectToDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if(fromDate > e.currentTarget.value) setTodate(fromDate);
    else setTodate(e.currentTarget.value);
  }

  const scheduleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSchedule(e.currentTarget.value);
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
        <Col css={css(dateMiddleStyle)}>
          ~
        </Col>
        <Col>
          <Input
            type="date"
            value={toDate}
            onChange={selectToDateHandler}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            placeholder="Enter your schedule"
            type="text"
            value={schedule}
            onChange={scheduleChangeHandler}
            clearButton={setSchedule}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            align="right"
            backgroundColor="#92bdff"
            color="#fefefe"
            onClick={changeSchedule}
          >
            Add
          </Button>
        </Col>
      </Row>
    </div>
  )
}