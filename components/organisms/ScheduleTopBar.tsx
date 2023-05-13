import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { Col, Nav, Navbar, Offcanvas, Row } from "react-bootstrap";
import { Dropdown } from "../atoms/dropdown/Dropdown";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { LoginStateType, UserType } from "@/services/firebase/firebase.type";
import { isLogedInState, selectedYearState, userInfoState } from "@/states/states";
import { logOut } from "@/services/firebase/auth";
import { getYearList } from "@/services/util/util";

export const ScheduleTopBar = () => {
  const [userInfo, setUserInfo] = useRecoilState<UserType>(userInfoState);
  const setIsLogedIn = useSetRecoilState<LoginStateType>(isLogedInState);
  const [selectedYear, setSelectedYear] = useRecoilState<string>(selectedYearState);
  const router = useRouter();

  const topRowStyle = css`
    height: 70px !important;
  `;

  const topColStyle = css`
    margin: auto;
  `;

  const navButtonStyle = css`
    border: 0;
    padding: 0;
    outline: 0;
  `;

  const offcanvasStyle = css`
    background-color: #f2f2f2;
  ;`;

  const signOutButtonStyle = css`
    color: #9e9e9e;
    width: fit-content;
    float: right;
  `;

  const data = getYearList();

  const selectYear = (year: string) => {
    setSelectedYear(year);
  }

  return (
    <Row css={topRowStyle}>
      <Col css={topColStyle}>
        <Navbar expand={false}>
          <Navbar.Toggle
            aria-controls={`nav-1`}
            css={navButtonStyle}
            onClick={(e) => e.currentTarget.blur()}
          />
          <Navbar.Offcanvas
            id={`nav-1`}
            aria-labelledby={`nav-2`}
            placement="end"
            css={offcanvasStyle}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`nav-2`}>MENU</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Item>E-mail: {userInfo?.email}</Nav.Item>
                <Nav.Item>Name: {userInfo?.name}</Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={async () => {
                    const result = await logOut();
                    if(result) {
                      setUserInfo(null);
                      setIsLogedIn(null);
                      router.replace("/");
                    }
                  }} css={signOutButtonStyle}>Sign Out</Nav.Link>
                </Nav.Item>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar>
      </Col>
      <Col css={topColStyle}>
        <Dropdown
          initText={selectedYear}
          items={data}
          onClickItemHandler={selectYear}
          align="right"
        />
      </Col>
    </Row>
  );
}