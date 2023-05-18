import { s } from "@/services/util/util";
import { selectedLanguageState, showModalState } from "@/states/states";
import i18next, { t } from "i18next";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { Dropdown } from "../atoms/dropdown/Dropdown"
import { DropdownDataProps } from "../atoms/dropdown/dropdown.props"

export const LanguageSelector = () => {
  const setSelectedLanguage = useSetRecoilState<string>(selectedLanguageState);
  const setShowModal = useSetRecoilState(showModalState);
  const router = useRouter();

  const data: DropdownDataProps[] = [
    {
      key: "kr",
      href: "#",
      label: "한국어"
    },
    {
      key: "en",
      href: "#",
      label: "English"
    }
  ]

  const getLanguageName = (langCode: string) => {
    const result = data.filter((value) => {
      return value.key === langCode
    });
    if(result.length > 0) return result[0].label
    else return ""
  }

  const selectLanguage = async (langCode: string) => {
    setSelectedLanguage(langCode);
    try {
      localStorage.setItem("language", langCode);
      router.reload();
    } catch(error: any) {
      setShowModal({
        show: true,
        title: s(t("Error")),
        content: error.message
      })
    }
  }

  return (
    <Dropdown
    title={`${s(t('Language'))}:`}
    initText={getLanguageName(i18next.language)}
    items={data}
    onClickItemHandler={selectLanguage}
    align="right"
    color="#3e3e3e"
  />
  )
}