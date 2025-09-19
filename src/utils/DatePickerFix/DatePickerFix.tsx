import { Dayjs } from "dayjs";
import generatePicker from "antd/es/date-picker/generatePicker";
import { generateJalaliConfigFix } from "./utils/jalali";

const DatePickerFix = generatePicker<Dayjs>(generateJalaliConfigFix);
export default DatePickerFix;
