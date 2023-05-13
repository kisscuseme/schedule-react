import { and, collection, DocumentData, getDocs, limit, orderBy, query, QueryDocumentSnapshot, startAfter, where, WhereFilterOp } from "firebase/firestore";
import { firbaseDb } from "./firebase";
import { ScheduleType } from "./firebase.type";

const getFullPath = (uid: string) => {
  const language: string = "KR";
  const dbRootPath: string = "language/" + language;
  return dbRootPath + "/user/" + uid + "/schedule";
}

const makeRangeQuery = (fields: string[],  operators: WhereFilterOp[], values: string[]) => {
  const query = and (
    where(fields[0], operators[0], values[0]),
    where(fields[1], operators[1], values[1])
  )
  return query;
}

const queryScheduleData = async (whereConfig: any, uid: string, lastVisible: QueryDocumentSnapshot<DocumentData> | null) => {
  const limitNumber = 2;
  const fullPath = getFullPath(uid);
  const currentQuery = lastVisible? query(
    collection(firbaseDb, fullPath),
    makeRangeQuery(whereConfig.fields, whereConfig.operators, whereConfig.values),
    orderBy("date", "desc"),
    startAfter(lastVisible),
    limit(limitNumber)
  ) : query(
    collection(firbaseDb, fullPath),
    makeRangeQuery(whereConfig.fields, whereConfig.operators, whereConfig.values),
    orderBy("date", "desc"),
    limit(limitNumber)
  );
  const documentSnapshots = await getDocs(currentQuery);
  const scheduleList: ScheduleType[] = [];
  documentSnapshots.forEach((result) => {
    const reformDate = result.data()["date"].replace("년", ".").replace("월",".").replace("일"," ");
    scheduleList.push({
      id: result.id,
      date: reformDate,
      content: result.data()["content"]
    });
  });

  const nextLastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
  return {
    lastVisible: nextLastVisible,
    dataList: scheduleList
  };
}

export { queryScheduleData, getFullPath }