import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { Col, Nav, Navbar, Offcanvas, Row } from "react-bootstrap";
import { Dropdown } from "../atoms/dropdown/Dropdown";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { LoginStateType, UserType } from "@/services/firebase/firebase.type";
import { isLogedInState, selectedYearState, showModalState, userInfoState } from "@/states/states";
import { logOut } from "@/services/firebase/auth";
import { getToday, getYearList, s } from "@/services/util/util";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteUser, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/services/firebase/firebase";
import { t } from "i18next";
import { LanguageSelector } from "./LanguageSelector";
import { DivisionLine } from "../molecules/divideLine/DivisionLine";

export const ScheduleTopBar = () => {
  const [userInfo, setUserInfo] = useRecoilState<UserType>(userInfoState);
  const setIsLogedIn = useSetRecoilState<LoginStateType>(isLogedInState);
  const [selectedYear, setSelectedYear] = useRecoilState<string>(selectedYearState);
  const setShowModal = useSetRecoilState(showModalState);
  const router = useRouter();

  useEffect(() => {
    setSelectedYear(getToday().substring(0,4));
  }, [setSelectedYear]);

  const topRowStyle = css`
    height: 70px !important;
  `;

  const topColStyle = css`
    margin: auto;
  `;

  const navButtonStyle = css`
    border: 0;
    padding: 0;
    &:focus {
      box-shadow: unset;
    }
  `;

  const offcanvasStyle = css`
    background-color: #f2f2f2;
  ;`;

  const signOutButtonStyle = css`
    color: #9e9e9e;
    width: fit-content;
    float: right;
  `;

  const deleteUserButtonStyle = css`
    color: hotpink;
    width: fit-content;
    float: right;
    &:hover {
      color: pink;
    }
  `;

  const data = getYearList();

  const selectYear = (year: string) => {
    setSelectedYear(year);
  }

  const signOutMutation = useMutation(logOut, {
    onSuccess(data) {
      if(data) {
        setUserInfo(null);
        setIsLogedIn(null);
        router.replace("/");
      }
    },
  });

  const signOutHandler = () => {
    setShowModal({
      title: s(t("Check")),
      content: s(t("Are you sure you want to log out?")),
      show: true,
      confirm: () => {
        signOutMutation.mutate();
      }
    });
  }

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess() {
      router.reload();
    }
  });

  const deleteUserHandler = () => {
    setShowModal({
      title: s(t("Check")),
      content: s(t("Are you sure you want to delete your account?")),
      show: true,
      confirm: () => {
        onAuthStateChanged(firebaseAuth, (user) => {
          if(user) deleteUserMutation.mutate(user);
        })();
      }
    });
  }

  return (
    <Row css={topRowStyle}>
      <Col css={topColStyle}>
        <Navbar expand={false}>
          <Navbar.Toggle
            aria-controls={`nav-1`}
            css={navButtonStyle}
          />
          <Navbar.Offcanvas
            id={`nav-1`}
            aria-labelledby={`nav-2`}
            placement="end"
            css={offcanvasStyle}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`nav-2`}>
                {s(t('SCHEDULE'))}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Row>
                <Col><LanguageSelector/></Col>
              </Row>
              <DivisionLine/>
              <Row>
                <Col>{s(t("E-mail"))}: {userInfo?.email}</Col>
              </Row>
              <Row>
                <Col>{s(t("Name"))}: {userInfo?.name}</Col>
              </Row>
              <DivisionLine/>
              <Row>
                <Col></Col>
                <Col>
                  <Nav.Link
                    onClick={() => signOutHandler()}
                    css={signOutButtonStyle}
                  >
                    {s(t("Sign Out"))}
                  </Nav.Link>
                </Col>
                <Col>
                  <Nav.Link
                    onClick={() => deleteUserHandler()}
                    css={deleteUserButtonStyle}
                  >
                    {s(t("Delete User"))}
                  </Nav.Link>
                </Col>
              </Row>
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
          color="#3e3e3e"
        />
      </Col>
    </Row>
  );
}