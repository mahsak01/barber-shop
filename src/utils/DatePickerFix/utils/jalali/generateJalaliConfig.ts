import dayjs from "dayjs";
import jalaliday from "jalali-plugin-dayjs";
import { noteOnce } from "rc-util/lib/warning";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { default as faLocale } from "./locale";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(jalaliday);

dayjs.locale(faLocale, undefined, true);

dayjs.extend((_, c) => {
  // todo support Wo (ISO week)
  const proto = c.prototype;
  const oldFormat = proto.format;
  proto.format = function f(formatStr: string) {
    const str = (formatStr || "").replace("Wo", "wo");
    return oldFormat.bind(this)(str);
  };
});

type IlocaleMapObject = { [key: string]: string };
const localeMap: IlocaleMapObject = {
  en_GB: "en-gb",
  en_US: "en",
  zh_CN: "zh-cn",
  zh_TW: "zh-tw",
  fa_IR: "fa",
};

const parseLocale = (locale: string) => {
  const mapLocale = localeMap[locale];
  return mapLocale || locale.split("_")[0];
};

const parseNoMatchNotice = () => {
  noteOnce(false, "Not match any format. Please help to fire a issue about this.");
};

const generateJalaliConfig = {
  // get
  getNow: () => dayjs(),
  getFixedDate: (string: string) => dayjs(string, "YYYY-MM-DD"),
  getEndDate: (date: dayjs.Dayjs) => date.endOf("month"),
  getWeekDay: (date: dayjs.Dayjs) => {
    if (!date?.weekday()) {
      date = dayjs();
    }
    const clone = date.locale("en");
    return clone.weekday() + clone.localeData().firstDayOfWeek();
  },
  getYear: (date: dayjs.Dayjs) => date.year(),
  getMonth: (date: dayjs.Dayjs) => date.month(),
  getDate: (date: dayjs.Dayjs) => date.date(),
  getHour: (date: dayjs.Dayjs) => date.hour(),
  getMinute: (date: dayjs.Dayjs) => date.minute(),
  getSecond: (date: dayjs.Dayjs) => date.second(),

  // set
  addYear: (date: dayjs.Dayjs, diff: number) => date.add(diff, "year"),
  addMonth: (date: dayjs.Dayjs, diff: number) => date.add(diff, "month"),
  addDate: (date: dayjs.Dayjs, diff: number) => date.add(diff, "day"),
  setYear: (date: dayjs.Dayjs, year: number) => date.year(year),
  setMonth: (date: dayjs.Dayjs, month: number) => date.month(month),
  setDate: (date: dayjs.Dayjs, num: number) => date.date(num),
  setHour: (date: dayjs.Dayjs, hour: number) => date.hour(hour),
  setMinute: (date: dayjs.Dayjs, minute: number) => date.minute(minute),
  setSecond: (date: dayjs.Dayjs, second: number) => date.second(second),

  getMillisecond: (date: dayjs.Dayjs) => date.millisecond(),
  setMillisecond: (date: dayjs.Dayjs, second: number) => date.millisecond(second),

  // Compare
  isAfter: (date1: dayjs.Dayjs, date2: dayjs.Dayjs) => date1.isAfter(date2),
  isValidate: (date: dayjs.Dayjs) => date.isValid(),
  locale: {
    getWeekFirstDate: (locale: string, date: dayjs.Dayjs) =>
      date.locale(parseLocale(locale)).weekday(0),
    getWeekFirstDay: (locale: string) =>
      dayjs().locale(parseLocale(locale)).localeData().firstDayOfWeek(),
    getWeek: (locale: string, date: dayjs.Dayjs) =>
      date.locale(parseLocale(locale)).week(),
    getShortWeekDays: (locale: string) =>
      dayjs().locale(parseLocale(locale)).localeData().weekdaysMin(),
    getShortMonths: (locale: string) =>
      dayjs().locale(parseLocale(locale)).localeData().monthsShort(),
    format: (locale: string, date: dayjs.Dayjs, format: string) => {
      return date.locale(parseLocale(locale)).format(format);
    },
    parse: (locale: string, text: string, formats: string[]) => {
      if (text.length !== 10) return null;

      const localeStr = parseLocale(locale);

      for (let i = 0; i < formats.length; i += 1) {
        const format = formats[i];
        const formatText = text;
        if (format.includes("wo") || format.includes("Wo")) {
          // parse Wo
          const year = formatText.split("-")[0];
          const weekStr = formatText.split("-")[1];
          const firstWeek = dayjs(year, "YYYY").startOf("year").locale(localeStr);
          for (let j = 0; j <= 52; j += 1) {
            const nextWeek = firstWeek.add(j, "week");
            if (nextWeek.format("Wo") === weekStr) {
              return nextWeek;
            }
          }
          parseNoMatchNotice();
          return null;
        }

        const date = dayjs(formatText, {
          format,
          locale: "fa_IR",
          //  "@ts-expect-error"
          jalali: true,
        }).locale(localeStr);

        if (date.isValid()) {
          return date;
        }
      }

      parseNoMatchNotice();
      return null;
    },
  },
};

export default generateJalaliConfig;
