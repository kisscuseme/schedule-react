import { Container } from "@/components/molecules/Container";
import { ScheduleInputForm } from "@/components/organisms/ScheduleInputForm";
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
      <ScheduleInputForm/>
      <div css={css(divideStyle)}></div>
      <ScheduleList/>
    </Container>
  );
}