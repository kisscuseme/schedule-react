import { Container } from "@/components/atoms/container/Container";
import { ScheduleAddForm } from "@/components/organisms/ScheduleAddForm";
import { ScheduleList } from "@/components/organisms/ScheduleList";
import { ScheduleTopBar } from "@/components/organisms/ScheduleTopBar";
import { css } from "@emotion/react";

export default function Schedule() {
  const divideStyle = `
    border-top: 1px #ffffff solid;
    margin: 5px;
  `;

  return (
    <Container>
      <ScheduleTopBar/>
      <ScheduleAddForm/>
      <div css={css(divideStyle)}></div>
      <ScheduleList/>
    </Container>
  );
}