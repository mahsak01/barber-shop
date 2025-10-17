import { ReactNode, useEffect, useState } from "react";
import { FormInstance, Calendar, GetProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import moment from "jalali-moment";
import { JalaliLocaleListenerFix } from "@/utils/DatePickerFix/utils/jalali";
import "./_customCalendar.css";

type CustomCalendarProps = {
  label?: string;
  name: string;
  className?: string;
  defaultValue?: any;
  placeholder?: string;
  rules?: any;
  value?: any;
  disabled?: boolean;
  allowClear?: boolean;
  autoFocus?: boolean;
  bordered?: boolean;
  disabledDate?: (currentDate: any) => boolean;
  style?: React.CSSProperties;
  popupStyle?: React.CSSProperties;
  onPanelChange?: any;
  onOpenChange?: any;
  picker?: "date" | "week" | "month" | "quarter" | "year";
  size?: "large" | "middle" | "small";
  customContainerClass?: string;
  form?: FormInstance<any>;
  isLoading?: boolean;
  isEmpty?: boolean;
  isYearSelectorDisabled?: boolean;
  onChange?: (value: any) => void;
  EmptyNodeHandler?: ReactNode;
} & GetProps<typeof Calendar>;

const CustomCalendar = ({
  value = new Date(),
  className,
  isYearSelectorDisabled,
  isLoading,
  isEmpty,
  EmptyNodeHandler,
  onChange,
  ...props
}: CustomCalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Dayjs | undefined>(undefined);

  useEffect(() => {
    // Convert the initial value to Jalali format using jalali-moment
    const initialDate = moment(value).locale("fa"); // Convert to jalali date
    setCurrentDate(dayjs(initialDate.toISOString())); // Set the date in dayjs format
  }, []);

  // Handle date change
  const onChangeHandler = (date: Dayjs) => {
    // Convert the selected date back to Jalali format

    const jalaliDate = date ? moment(date.toDate()).locale("fa") : null;

    if (onChange) {
      onChange(jalaliDate);
    }
    setCurrentDate(date);
  };

  return (
    <div className="custom-calendar-root">
      <JalaliLocaleListenerFix />
      <Calendar
        value={currentDate}
        onChange={onChangeHandler}
        className={`custom-calendar-container ${className ? className : ""} ${isYearSelectorDisabled ? "hide-year" : ""} ${isLoading ? "is-calendar-loading" : ""} ${isEmpty ? "is-calendar-empty" : ""}`}
        {...props}
      />
      {isLoading && (
        <div className="custom-calendar-loader">
          <p>Loading</p>
        </div>
      )}
      {isEmpty && EmptyNodeHandler}
    </div>
  );
};

CustomCalendar.displayName = "CustomCalendar";

export default CustomCalendar;
