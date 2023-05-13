import { DropdownDataProps } from "@/components/atoms/dropdown/dropdown.props";

export const getToday = () => {
  const dateArr = new Date().toLocaleDateString().replaceAll(" ", "").split(".");
  const today = dateArr[0] + "-" + ("0" + dateArr[1]).slice(-2, 3) + "-" + ("0" + dateArr[2]).slice(-2, 3);
  return today;
};

export const getYearList = () => {
  const yearList: DropdownDataProps[] = [];
  const now = new Date();
  const year: number = now.getFullYear();
  for(let i=-5 ; i < 6; i++ ) {
    yearList.push({
      key: String(year + i),
      href: "#",
      label: String(year + i) + (i === -5? " 이전": "")
    });
  }
  yearList.reverse();
  return yearList;
}

export const checkEmail = (email: string) => {
  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  return emailRegEx.test(email);
};

export const checkPassword = (password: string) => {
  const passwordRegEx = /^[A-Za-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{6,20}$/;
  return passwordRegEx.test(password);
};