import { forwardRef, useEffect, useState } from "react";
import { DatePicker, Form, FormInstance, GetProps, GetRef } from "antd";
import dayjs, { Dayjs } from "dayjs";
import moment from "jalali-moment";
import { Rule } from "antd/es/form";
import momentOriginal from "moment";
import "./_customDatePicker.css";
import { JalaliLocaleListenerFix } from "@/utils/DatePickerFix/utils/jalali";
 


type CustomDatePickerProps = Omit<GetProps<typeof DatePicker>, "form"> & {
  label?: string;
  name: string;
  className?: string;
  defaultValue?: any;
  placeholder?: string;
  // otherProps?: CalendarProps & DatePickerProps;
  rules?: Rule[];
  // value?: any;
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
  hasFeedback?: boolean;
  isGregorian?: boolean;
  hasNullInitiator?: boolean;
  forceRerender?: boolean;
  validateTrigger?: string | string[] | false;
  hasVerticalLabel?: boolean;
};
const CustomDatePicker = forwardRef<GetRef<typeof DatePicker>, CustomDatePickerProps>(
  (
    {
      label,
      name,
      className,
      placeholder,
      rules,
      disabled,
      allowClear = true,
      hasFeedback = true,
      autoFocus = false,
      disabledDate,
      style = {},
      onPanelChange,
      onOpenChange,
      size,
      popupStyle = {},
      picker = "date",
      defaultValue,
      form,
      customContainerClass,
      isLoading = false,
      isGregorian = false,
      onChange,
      validateTrigger = undefined,
      variant = "outlined",
      hasNullInitiator = false,
      forceRerender = false,
      hasVerticalLabel = true,
      
      ...props
    },
    ref
  ) => {
    const [newDefaultValue, setNewDefaultValue] = useState<Dayjs | Dayjs[] | string>("");
    const [formField, setFormField] = useState(form?.getFieldValue(name));
    // const formField = form?.getFieldValue(name);

    // ! test new version
    useEffect(() => {
      setFormField(form?.getFieldValue(name));
    }, [form?.getFieldValue(name)]);

    const dayJsString =
      formField instanceof Array ? JSON.stringify(formField) : dayjs(formField).valueOf();

    useEffect(() => {
      if (formField) {
        if (formField instanceof Array) {
          setNewDefaultValue(formField?.map((item) => dayjs(item)));
        } else {
          setNewDefaultValue(dayjs(formField));
        }
      }
      // FOR THE CASE OF IF WE DIDN'T SET ANYTHING IN DATE BUT WE WANT THE 'NOW' TO BE PRE SELECTED
      if (hasNullInitiator) {
        setNewDefaultValue(dayjs());
      }
      if (!formField && forceRerender) {
        setNewDefaultValue("");
      }
    }, [dayJsString]);

    return (
      <div
        className={`date-pick-container ${
          customContainerClass ? customContainerClass : " "
        }`}
        // loading={isLoading}
      >
        <Form.Item
          label={label}
          htmlFor={name}
          className={`${hasVerticalLabel && "vertical-label"} ${className ? className : ""}`}
          name={name}
          rules={rules}
          hasFeedback={hasFeedback}
          shouldUpdate={isLoading}
          validateTrigger={validateTrigger}
        >
          {/* <DatePicker /> */}
          <JalaliLocaleListenerFix />
          <DatePicker
          
            id={name}
            aria-label={label === null ? "لیبل تاریخ" : label?.toString()}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            allowClear={allowClear}
            autoFocus={autoFocus}
            variant={variant}
            disabledDate={disabledDate}
            style={style}
            onPanelChange={onPanelChange}
            onOpenChange={onOpenChange}
            size={size}
            key={
              // Todo[Atefeh]: remove it in the future

              //v1
              // newDefaultValue instanceof Array
              //   ? newDefaultValue?.map((item) => item?.valueOf()?.toString())?.toString()
              //   : newDefaultValue?.valueOf()?.toString()
              //v2
              // newDefaultValue instanceof Array
              //   ? newDefaultValue?.[newDefaultValue?.length - 1]?.valueOf()
              //   : newDefaultValue?.valueOf()
              //v3
              newDefaultValue instanceof Array
                ? JSON.stringify(newDefaultValue)
                : newDefaultValue?.valueOf()
            }
            popupStyle={popupStyle}
            picker={picker}
            defaultValue={newDefaultValue}
            // value={newDefaultValue}
            onChange={(_: any, dateString: any) => {
              if (dateString === "") {
                return form?.setFieldsValue({
                  [name]: undefined,
                });
              }

              if (typeof onChange === "function") {
                return onChange?.(_, dateString);
              }

              if (isGregorian) {
                return form?.setFieldsValue({
                  [name]: momentOriginal(_).format("YYYY-MM-DDT00:00:00.000+03:30"),
                });
              }

              form?.setFieldsValue({
                [name]: moment
                  .from(dateString, "fa", "YYYY-MM-DD")
                  .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
              });
            }}
            ref={ref}
            {...props}
          />
        </Form.Item>
      </div>
    );
  }
);

CustomDatePicker.displayName = "CustomDatePicker";
export default CustomDatePicker;
