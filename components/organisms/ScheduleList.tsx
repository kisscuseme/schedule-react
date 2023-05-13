import { queryScheduleData } from "@/services/firebase/db";
import { ScheduleType, UserType } from "@/services/firebase/firebase.type";
import { getYearList } from "@/services/util/util";
import { selectedYearState, userInfoState } from "@/states/states";
import { css } from "@emotion/react";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { Button } from "../atoms/button/Button";
import { Text } from "../atoms/text/Text";

export const ScheduleList = () => {
  const selectedYear = useRecoilValue<string>(selectedYearState);
  const userInfo = useRecoilValue<UserType>(userInfoState);
  const [data, setData] = useState<ScheduleType[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [allowLoading, setAllowLoading] = useState<boolean>(true);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [nextLastVisible, setNextLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [noMoreData, setNoMoreData] = useState<boolean>(false);
  const [newStart, setNewStart] = useState<boolean>(false);

  const getYearRange = () => {
    const yearList = getYearList();
    const values = [];
    if(selectedYear === yearList[yearList.length-1].key) {
      values.push("0000");
      values.push(selectedYear + "\uf8ff");
    }
    else if(selectedYear === yearList[0].key) {
      values.push(selectedYear);
      values.push("9999" + "\uf8ff");
    }
    else {
      values.push(selectedYear);
      values.push(selectedYear + "\uf8ff");
    }
    return values;
  }

  const queryClickHandler = async () => {
    if(allowLoading) {
      setAllowLoading(false);
      const result = await queryScheduleData({
        fields: ["date", "date"],
        operators: [">=", "<="],
        values: getYearRange()
      }, userInfo?.uid as string, lastVisible);
      lastVisible && !noMoreData ? setData([...data, ...result.dataList]) : setData(result.dataList);
      result.lastVisible ? setNextLastVisible(result.lastVisible) : setNoMoreData(true);
      setAllowLoading(true);
    }
  }

  useEffect(() => {
    setNoMoreData(false);
    setLastVisible(null);
    setNewStart(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear]);

  useEffect(() => {
    if(newStart || lastVisible) {
      setNewStart(false);
      queryClickHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newStart, lastVisible]);

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
    queryClickHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const spinnerStyle = css`
    margin: auto;
    display: flex;
  `;

  return (
    <div className="schedule-list">
      <style>
        {`
          .schedule-list .row {
            min-height: 30px;
          }
  
          .schedule-list .col {
            color: #5e5e5e;
            margin: auto;
          }

          .schedule-list .col-5 {
            color: #8e8e8e;
            margin: auto;
            max-width: 150px;
          }
        `}
      </style>
      {data.length > 0 ? (
        data.map((item) => (
          <Row key={item?.id}>
            <Col xs={5}>
              <Text>{item?.date}</Text>
            </Col>
            <Col>
              <Text>{item?.content}</Text>
            </Col>
          </Row>
        ))
      ) : (
        <Row>
          <Col>
            <Text align="center">조회된 항목이 없습니다.</Text>
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          {data.length > 0 && !noMoreData && ( allowLoading ? (
            <Button
              onClick={() => {
                setLastVisible(nextLastVisible);
              }}
              align="center"
              btnRef={buttonRef}
            >
              More...
            </Button>
          ) : (
            <Button align="center">
              <Spinner animation="border" css={spinnerStyle} />
            </Button>
          ))}
        </Col>
      </Row>
    </div>
  );
}