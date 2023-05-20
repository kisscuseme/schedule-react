import SignUp from "@/components/templates/SignUp";
import { selectedLanguageState } from "@/states/states";
import i18next from "i18next";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function SignUpPage() {
  const selectedLanguage = useRecoilValue(selectedLanguageState);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  useEffect(() => {
    console.log(selectedLanguage);
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

  return <SignUp/>
}
