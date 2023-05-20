import { Col, Row } from "react-bootstrap";
import { Input } from "../atoms/input/Input";
import { css } from "@emotion/react";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ScheduleInputType } from "@/types/global.types";
import { useRecoilValue } from "recoil";
import { resetClearButtonState, scheduleAccordionActiveState } from "@/states/states";

interface ScheduleInputFormProps {
  scheduleInput: ScheduleInputType,
  setScheduleInput: Dispatch<SetStateAction<ScheduleInputType>>,
  scheduleInputPlaceholder?: string
  initValue?: string
}

export const ScheduleInputForm = ({
  scheduleInput,
  setScheduleInput,
  scheduleInputPlaceholder,
  initValue
}: ScheduleInputFormProps) => {
  const scheduleClearButtonRef = useRef<HTMLButtonElement>(null);
  const resetClearButton = useRecoilValue(resetClearButtonState);
  const scheduleAccordionActive = useRecoilValue(scheduleAccordionActiveState);
  const [inputInitValue, setInputInitValue] = useState(initValue);

  const selectFromDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if(scheduleInput.toDate < e.currentTarget.value) setScheduleInput({
      ...scheduleInput,
      fromDate: e.currentTarget.value,
      toDate: e.currentTarget.value
    });
    else setScheduleInput({
      ...scheduleInput,
      fromDate: e.currentTarget.value
    });
  }

  const selectToDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if(scheduleInput.fromDate > e.currentTarget.value) setScheduleInput({
      ...scheduleInput,
      fromDate: e.currentTarget.value,
      toDate: e.currentTarget.value
    });
    else setScheduleInput({
      ...scheduleInput,
      toDate: e.currentTarget.value
    });
  }

  const scheduleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setScheduleInput({
      ...scheduleInput,
      schedule: e.currentTarget.value
    });
  }

  useEffect(() => {
    if(scheduleInput.schedule === "") {
      scheduleClearButtonRef.current?.click();
    }
  }, [scheduleInput]);

  useEffect(() => {
    if(scheduleInput.id === scheduleAccordionActive) {
      setInputInitValue("");
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetClearButton]);

  useEffect(() => {
    if(inputInitValue === "") {
      setInputInitValue(scheduleInput.schedule);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputInitValue]);

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
            value={scheduleInput.fromDate}
            onChange={selectFromDateHandler}
          />
        </Col>
        <Col css={css(dateMiddleStyle)}>
          ~
        </Col>
        <Col>
          <Input
            type="date"
            value={scheduleInput.toDate}
            onChange={selectToDateHandler}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            placeholder={scheduleInputPlaceholder}
            type="text"
            value={scheduleInput.schedule}
            initValue={inputInitValue}
            onChange={scheduleChangeHandler}
            clearButton={true}
            clearBtnRef={scheduleClearButtonRef}
            onClearButtonClick={() => {
              setScheduleInput({
                ...scheduleInput,
                schedule: ""
              });
            }}
          />
        </Col>
      </Row>
    </div>
  )
}