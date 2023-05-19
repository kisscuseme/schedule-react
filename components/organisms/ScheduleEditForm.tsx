import { Col, Row, useAccordionButton } from "react-bootstrap";
import { EventHandler, SyntheticEvent, useEffect, useRef, useState } from "react";
import { ScheduleType, UserType } from "@/services/firebase/firebase.type";
import { Button } from "../atoms/button/Button";
import { deleteScheduleData, updateScheduleData } from "@/services/firebase/db";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { reloadDataState, rerenderDataState, scheduleAccordionActiveState, showModalState, userInfoState } from "@/states/states";
import { getReformDate, s } from "@/services/util/util";
import { ScheduleInputForm } from "./ScheduleInputForm";
import { ScheduleInputType } from "@/types/global.types";
import { useMutation } from "@tanstack/react-query";
import { t } from "i18next";

interface ScheduleEditFromProps {
  beforeSchedule: ScheduleType
  scheduleList: ScheduleType[]
}

export const ScheduleEditForm = ({
  beforeSchedule,
  scheduleList
}: ScheduleEditFromProps) => {
  const [scheduleInput, setScheduleInput] = useState<ScheduleInputType>({
    fromDate: beforeSchedule?.date.substring(0,10).replaceAll(".","-") as string,
    toDate: beforeSchedule?.toDate?.substring(0,10).replaceAll(".","-") as string,
    schedule: beforeSchedule?.content as string
  });
  const userInfo = useRecoilValue<UserType>(userInfoState);
  const setShowModal = useSetRecoilState(showModalState);
  const [reloadData, setReloadData] = useRecoilState(reloadDataState);
  const closeAccordion = useAccordionButton(beforeSchedule?.id as string);
  const closeAccordionButtonRef = useRef<HTMLButtonElement>(null);
  const [scheduleAccordionActive, setScheduleAccordionActive] = useRecoilState(scheduleAccordionActiveState);
  const [rerenderData, setRerenderDataState] = useRecoilState(rerenderDataState);

  useEffect(() => {
    if(beforeSchedule?.id as string === scheduleAccordionActive) {
      setScheduleAccordionActive(null);
      closeAccordionButtonRef.current?.click();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadData]);
  
  const resetChange = () => {
    setScheduleInput({
      fromDate: beforeSchedule?.date.substring(0,10).replaceAll(".","-") as string,
      toDate: beforeSchedule?.toDate?.substring(0,10).replaceAll(".","-") as string,
      schedule: beforeSchedule?.content as string
    });
  }

  const changeScheduleMutation = useMutation(updateScheduleData, {
    onSuccess() {
      const index = scheduleList.findIndex((schedule) => schedule?.id === beforeSchedule?.id);
      if(index > -1) {
        scheduleList[index] = {
          id: beforeSchedule?.id as string,
          date: getReformDate(scheduleInput.fromDate,"."),
          content: scheduleInput.schedule,
          toDate: getReformDate(scheduleInput.toDate,".")
        };
      }
      scheduleList.sort((a, b) => {
        if(a === null || b === null) return 0
        else {
          const numA = Number(a.date.replaceAll(".","").substring(0,8));
          const numB = Number(b.date.replaceAll(".","").substring(0,8));
          return numB - numA;
        }
      });
      setRerenderDataState(!rerenderData);
    }
  });

  const changeSchedule = (event: SyntheticEvent<any, Event>, eventHandler: EventHandler<SyntheticEvent<any, Event>>) => {
    if(scheduleInput.schedule === "") {
      setShowModal({
        show: true,
        title: s(t("Check")),
        content: s(t("Please enter your content."))
      });  
    } else if(scheduleInput.fromDate === "" || scheduleInput.toDate === "") {
      setShowModal({
        show: true,
        title: s(t("Check")),
        content: s(t("Please enter a date."))
      });
    } else {
      setShowModal({
        show: true,
        title: s(t("Check")),
        content: s(t("Are you sure you want to edit?")),
        confirm: () => {
          changeScheduleMutation.mutate({
            uid: userInfo?.uid as string,
            scheduleId: beforeSchedule?.id as string,
            newSchedule: {
              content: scheduleInput.schedule,
              date: getReformDate(scheduleInput.fromDate, "."),
              toDate: getReformDate(scheduleInput.toDate, ".")
            }
          });
          eventHandler(event);
        }
      });
    }
  }

  const deleteScheduleMutation = useMutation(deleteScheduleData, {
    onSuccess() {
      scheduleList.sort((a, b) => {
        if(a === null || b === null) return 0
        else {
          let numA = Number(a.date.replaceAll(".","").substring(0,8));
          let numB = Number(b.date.replaceAll(".","").substring(0,8));
          if(b.id === beforeSchedule?.id) return -1;
          else return numB - numA;
        }
      });
      scheduleList.pop();
      setRerenderDataState(!rerenderData);
    },
  });

  const deleteSchedule = (event: SyntheticEvent<any, Event>, eventHandler: EventHandler<SyntheticEvent<any, Event>>) => {
    setShowModal({
      show: true,
      title: s(t("Caution")),
      content: s(t("Are you sure you want to delete?")),
      confirm: () => {
        deleteScheduleMutation.mutate({
          uid: userInfo?.uid as string,
          scheduleId: beforeSchedule?.id as string
        });
        eventHandler(event);
      }
    });
  }

  return (
    <>
      <ScheduleInputForm
        scheduleInput={scheduleInput}
        setScheduleInput={setScheduleInput}
      />
      <Row>
        <Col>
          <Button
            size="small"
            align="right"
            color="#5e5e5e"
            backgroundColor="#fefefe"
            onClick={resetChange}
          >
            {s(t("Reset"))}
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
            {s(t("Edit"))}
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
            {s(t("Delete"))}
          </Button>
        </Col>
      </Row>
      <div className="hidden-button">
        <Button
          btnRef={closeAccordionButtonRef}
          onClick={(e) => {
            closeAccordion(e);
          }}
        >
          close accordion
        </Button>
      </div>
    </>
  );
}