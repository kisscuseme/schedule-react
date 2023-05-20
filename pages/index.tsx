import { firebaseAuth } from "@/services/firebase/firebase";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLogedInState, selectedLanguageState, userInfoState } from "@/states/states";
import Schedule from "@/components/templates/Schedule";
import SignIn from "@/components/templates/SignIn";
import { LoadingScreen } from "@/components/molecules/loadingScreen/LoadingScreen";
import { useEffect, useState } from "react";
import i18next from "i18next";

export default function Home() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isLogedIn, setIsLogedIn] = useRecoilState(isLogedInState);
  const selectedLanguage = useRecoilValue(selectedLanguageState);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  useEffect(() => {
    if(selectedLanguage !== null) {
      i18next.changeLanguage(selectedLanguage).then((t) => {
        setIsChanged(!isChanged);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage]);

  useEffect(() => {
    if(selectedLanguage !== null) {
      localStorage.setItem("language", selectedLanguage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChanged]);

  firebaseAuth.onAuthStateChanged((user) => {
    if (user && user.emailVerified) {
      if (!userInfo) setUserInfo({
          uid: user.uid,
          name: user.displayName||"",
          email: user.email||""
        });
      if(isLogedIn === null) setIsLogedIn(true);
    } else {
      if(isLogedIn === null) setIsLogedIn(false);
    }
  })();

  if(isLogedIn === null) return <LoadingScreen/>
  else if(isLogedIn === true) return <Schedule/>
  else if(isLogedIn === false) return <SignIn/>
}
