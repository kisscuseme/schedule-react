import { s } from "@/services/util/util";
import { selectedLanguageState, showModalState } from "@/states/states";
import i18next, { t } from "i18next";
import { useSetRecoilState } from "recoil";
import { Dropdown } from "../atoms/dropdown/Dropdown";
import { DropdownDataProps } from "../atoms/dropdown/dropdown.props";
import localesJSON from "../../locales/locales.json";

export const LanguageSelector = () => {
  const setSelectedLanguage = useSetRecoilState(selectedLanguageState);
  const setShowModal = useSetRecoilState(showModalState);

  const data: DropdownDataProps[] = [];
  
  const locales = JSON.parse(JSON.stringify(localesJSON));
  for(const key in locales) {
    data.push({
      key: key,
      href: "#",
      label: locales[key]
    })
  }

  const getLanguageName = (langCode: string) => {
    const result = data.filter((value) => {
      return value.key === langCode
    });
    if(result.length > 0) return result[0].label
    else return ""
  }

  const selectLanguage = async (langCode: string) => {
    try {
      localStorage.setItem("language", langCode);
      setSelectedLanguage(langCode);
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