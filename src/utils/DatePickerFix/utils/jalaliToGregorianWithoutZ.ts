import dayjs, { Dayjs } from "dayjs";

export const jalaliToGregorianWithoutZ = (fromDate: Dayjs) => {
  return dayjs(fromDate).toISOString().replace("Z", "");
};
