import { Col, Row } from "react-bootstrap";
import { Input } from "../atoms/input/Input";
import { Button } from "../atoms/button/Button";
import { css } from "@emotion/react";
import { ChangeEvent, useState } from "react";
import { getToday } from "@/services/util/util";

export const ScheduleInputForm = () => {
  const [fromDate, setFromdate] = useState(getToday());
  const [toDate, setTodate] = useState(getToday());
  const [schedule, setSchedule] = useState("");

  const addScheduleClickHandler = () => {
    alert("일정 등록 구현 예정");
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
            primary
            onClick={addScheduleClickHandler}
          >
            Add Schedule
          </Button>
        </Col>
      </Row>
    </div>
  )
}