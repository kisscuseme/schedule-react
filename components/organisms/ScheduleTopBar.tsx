import { css } from "@emotion/react";
import { Dropdown } from "../atoms/dropdown/Dropdown";
import { DropdownDataProps } from "../atoms/dropdown/dropdown.props";
import { Text } from "../atoms/text/Text";
import { TopBar } from "../molecules/TopBar";

export const ScheduleTopBar = () => {
  const data: DropdownDataProps[] = [
    { key: "1", href: "#", label: "2022" },
    { key: "2", href: "#", label: "2023" },
    { key: "3", href: "#", label: "2024" },
    { key: "4", href: "#", label: "2025" }
  ]

  const selectYear = (year: string) => {
    alert(year + " 선택");
  }

  return (
    <TopBar>
      <Text as="h3">
        일정
      </Text>
      <Dropdown initText="2023" items={data} align="right" onClickHandler={selectYear}/>
  </TopBar>
  )
}