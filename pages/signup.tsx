import SignUp from "@/components/templates/SignUp";
import { selectedLanguageState } from "@/states/states";
import i18next from "i18next";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function SignUpPage() {
  const selectedLanguage = useRecoilValue(selectedLanguageState);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  useEffect(() => {
    setIsChanged(!isChanged);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return <SignUp/>
}
