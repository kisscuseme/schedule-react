import { queryScheduleData } from "@/services/firebase/db";
import { ScheduleType, UserType } from "@/services/firebase/firebase.type";
import { getYearList, s } from "@/services/util/util";
import { reloadDataState, scheduleAccordionActiveState, selectedYearState, userInfoState } from "@/states/states";
import { css } from "@emotion/react";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { AccordionChild } from "../molecules/accordion/AccordionChild";
import { AccordionParent } from "../molecules/accordion/AccordionParent";
import { Button } from "../atoms/button/Button";
import { Text } from "../atoms/text/Text";
import { useQuery } from "@tanstack/react-query";
import { ScheduleEditForm } from "./ScheduleEditForm";
import { t } from "i18next";

export const ScheduleList = () => {
  const selectedYear = useRecoilValue<string>(selectedYearState);
  const userInfo = useRecoilValue<UserType>(userInfoState);
  const [scheduledata, setScheduleData] = useState<ScheduleType[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [allowLoading, setAllowLoading] = useState<boolean>(true);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [nextLastVisible, setNextLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [noMoreData, setNoMoreData] = useState<boolean>(false);
  const [reloadData, setReloadData] = useRecoilState(reloadDataState);
  const [scheduleAccordionActive, setScheduleAccordionActive] = useRecoilState(scheduleAccordionActiveState);

  const getYearRange = () => {
    const yearList = getYearList();
    let fromYear = selectedYear;
    let toYear = selectedYear + "\uf8ff";
    
    if(selectedYear === yearList[yearList.length-1].key) {
      fromYear = "0000";
    }
    else if(selectedYear === yearList[0].key) {
      toYear = "9999" + "\uf8ff";
    }
    return {
      fromYear: fromYear,
      toYear: toYear
    };
  }

  const getScheduleData = () => {
    setAllowLoading(false);
    const yearRange = getYearRange();
    return queryScheduleData([
      {
        field: "date",
        operator: ">=",
        value: yearRange.fromYear
      },
      {
        field: "date",
        operator: "<=",
        value: yearRange.toYear
      }
    ], userInfo?.uid as string, lastVisible);
  }

  const { isLoading, refetch } = useQuery(["loadSchedule"], getScheduleData, {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: data => {
      lastVisible && !noMoreData ? setScheduleData([...scheduledata, ...data.dataList]) : setScheduleData(data.dataList);
      data.lastVisible ? setNextLastVisible(data.lastVisible) : setNoMoreData(true);
      setAllowLoading(true);
      setReloadData(false);
    },
    onError: (e: any) => {
      console.log(e.message);
      setAllowLoading(true);
    }
  });

  useEffect(() =>{
    let lastScrollY = 0;
    addEventListener("scroll", e => {
      const scrollY = window.scrollY;
      const direction = lastScrollY - scrollY;
      if(direction < 0) {
        if(document.body.scrollHeight < window.innerHeight + scrollY + 5) {
          if(!noMoreData) buttonRef.current?.click();
        }
      }
      // 현재의 스크롤 값을 저장
      lastScrollY = scrollY;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setReloadData(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear]);

  useEffect(() => {
    if(reloadData) {
      setNoMoreData(false);
      setLastVisible(null);
      setScheduleData([]);
    }
    if(reloadData || lastVisible) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadData, lastVisible]);

  const spinnerStyle = css`
    margin: auto;
    display: flex;
  `;

  return (
    <>
      <AccordionParent defaultActiveKey={scheduleAccordionActive} onSelect={(e) => {
        setScheduleAccordionActive(e as string);
      }}>
        {scheduledata.length > 0 ? (
          scheduledata.map((item) => (
            <Row key={item?.id}>
              <AccordionChild
                dataId={item?.id as string}
                headerContent={
                  <>
                    <Col xs={5}>
                      <Row>
                        <Text>{item?.date}</Text>
                      </Row>
                      {
                        item?.toDate && item?.date !== item?.toDate && <>
                          <Row>
                            <Text color="#6e6e6e" size="medium">{"~ " + item?.toDate}</Text>
                          </Row>
                        </>
                      }
                    </Col>
                    <Col>
                      <Text>{item?.content}</Text>
                    </Col>
                  </>
                }
                bodyContent={
                  <ScheduleEditForm beforeSchedule={item}/>
                }
              />
            </Row>
          ))
        ) : reloadData ? (
          <Button align="center">
            <Spinner animation="border" css={spinnerStyle} />
          </Button>
        ) : (
          <Row>
            <Col>
              <Text align="center">{s(t("No content was viewed."))}</Text>
            </Col>
          </Row>
        )}
      </AccordionParent>
      <Row>
        <Col>
          {scheduledata.length > 0 &&
            !noMoreData &&
            (allowLoading && !isLoading ? (
              <Button
                onClick={() => {
                  setLastVisible(nextLastVisible);
                }}
                align="center"
                btnRef={buttonRef}
              >
                {s(t("Load More"))}
              </Button>
            ) : (
              <Button align="center">
                <Spinner animation="border" css={spinnerStyle} />
              </Button>
            ))}
        </Col>
      </Row>
    </>
  );
}