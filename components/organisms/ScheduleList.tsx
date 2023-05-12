import { Col, Row } from "react-bootstrap";
import { Input } from "../atoms/input/Input";
import { Button } from "../atoms/button/Button";
import { Text } from "../atoms/text/Text";
import { css } from "@emotion/react";
import { ScheduleType } from "@/services/firebase/schedule.type";

export const ScheduleList = () => {
  const data: ScheduleType[] = [
    {id: "3", date: "2023-05-17", text: "진급자 교육"},
    {id: "2", date: "2023-05-16", text: "진급자 교육"},
    {id: "1", date: "2023-05-15", text: "진급자 교육"}
  ]

  return (
    <div className="schedule-list">
      <style>
        {`
          .schedule-list .row {
            min-height: 40px;
          }
  
          .schedule-list .col {
            color: #5e5e5e;
            margin: auto;
          }

          .schedule-list .col-5 {
            color: #8e8e8e;
            margin: auto;
            max-width: 100px;
          }
        `}
      </style>
      {data.length > 0? data.map(item =>
        <Row key={item?.id}>
          <Col xs={5}>
            <Text>{item?.date}</Text>
          </Col>
          <Col>
            <Text>{item?.text}</Text>
          </Col>
        </Row>
      ): <Row><Col>조회된 항목이 없습니다.</Col></Row>}
    </div>
  )
}