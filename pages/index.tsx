import { firebaseAuth } from "@/services/firebase/firebase";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLogedInState, selectedLanguageState, userInfoState } from "@/states/states";
import Schedule from "@/components/templates/Schedule";
import SignIn from "@/components/templates/SignIn";
import { LoadingScreen } from "@/components/molecules/loadingScreen/LoadingScreen";
import { useEffect, useState } from "react";
import i18next from "i18next";
import translationKR from '../locales/kr/translation.json';
import translationEN from '../locales/en/translation.json';
import localesJSON from '../locales/locales.json';

export default function Home() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isLogedIn, setIsLogedIn] = useRecoilState(isLogedInState);
  const selectedLanguage = useRecoilValue(selectedLanguageState);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  const getLocaleJSON = (locale: string) => {
    if(locale === "kr") return translationKR
    else return translationEN
  }

  useEffect(() => {
    const locales = localesJSON;
    let resources: any = {}
    for(const key in locales) {
      resources[key] = {
        translation: getLocaleJSON(key)
      }
    }
    
    i18next
    .init({
      resources,
      lng: localStorage.getItem("language")||"kr", //default language
      keySeparator: false,
      interpolation: {
        escapeValue: false,
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(selectedLanguage !== null) {
      i18next.changeLanguage(selectedLanguage||"kr").then((t) => {
        setIsChanged(!isChanged);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage]);

  useEffect(() => {
    localStorage.getItem(i18next.language);
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
