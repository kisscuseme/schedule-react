import { LoginStateType, UserType } from '@/services/firebase/firebase.type';
import { getToday } from '@/services/util/util';
import { atom } from 'recoil';

export const userInfoState = atom<UserType>({
  key: "userInfoState",
  default: null
});

export const isLogedInState = atom<LoginStateType>({
  key: "isLogedInState",
  default: null
});

export const selectedYearState = atom<string>({
  key: "selectedYearState",
  default: getToday().substring(0, 4)
});