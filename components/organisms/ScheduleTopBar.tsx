import { getToday } from "@/services/util/util";
import { css } from "@emotion/react";
import { Col, Row } from "react-bootstrap";
import { Dropdown } from "../atoms/dropdown/Dropdown";
import { DropdownDataProps } from "../atoms/dropdown/dropdown.props";
import { Text } from "../atoms/text/Text";

export const ScheduleTopBar = () => {
  const topRowStyle = css`
    height: 70px !important;
  `;

  const topColStyle = css`
    margin: auto;
  `;

  const data: DropdownDataProps[] = [
    { key: "1", href: "#", label: "2022" },
    { key: "2", href: "#", label: "2023" },
    { key: "3", href: "#", label: "2024" },
    { key: "4", href: "#", label: "2025" }
  ]

  const selectYear = (year: string) => {
    alert(year + " 선택");
  }

  const initText = getToday().substring(0, 4);

  return (
    <Row css={topRowStyle}>
      <Col css={topColStyle}>
        <Text as="h3">일정</Text>
      </Col>
      <Col css={topColStyle}>
        <Dropdown initText={initText} items={data} align="right" onClickItemHandler={selectYear}/>
      </Col>
    </Row>
  )
}