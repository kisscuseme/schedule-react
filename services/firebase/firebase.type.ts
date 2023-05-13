import { WhereFilterOp } from "firebase/firestore";

export type ScheduleType = {
    id: string
    date: string
    content: string
} | null;

export type UserType = {
    uid: string
    name: string
    email: string
} | null;

export type LoginStateType = boolean | null;

export type WhereConfigType = {
    fields: string[],
    operators: WhereFilterOp[],
    values: any[]
  }