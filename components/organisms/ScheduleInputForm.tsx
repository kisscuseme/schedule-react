import { Col, Row } from "react-bootstrap";
import { Input } from "../atoms/input/Input";
import { Button } from "../atoms/button/Button";
import { css } from "@emotion/react";
import { ChangeEvent } from "react";

export const ScheduleInputForm = () => {
  const dateArr = (new Date()).toLocaleDateString().replaceAll(" ", "").split(".");
  const today = dateArr[0] + "-" + ("0"+dateArr[1]).substr(-2, 2) + "-" + ("0"+dateArr[2]).substr(-2, 2);

  const addScheduleClickHandler = () => {
    alert("일정 등록 구현 예정");
  }

  const selectFromDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
  }

  const selectToDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
  }

  const scheduleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
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
          <Input type="date" value={today} onChange={selectFromDateHandler}></Input>
        </Col>
        <Col css={css(dateMiddleStyle)}>
          ~
        </Col>
        <Col>
          <Input type="date" value={today} onChange={selectToDateHandler}></Input>
        </Col>
      </Row>
      <Row>
        <Col>
          <Input placeholder="일정 입력" type="text" clearButton onChange={scheduleChangeHandler}></Input>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button align="right" primary onClick={addScheduleClickHandler}>
            등록
          </Button>
        </Col>
      </Row>
    </div>
  )
}