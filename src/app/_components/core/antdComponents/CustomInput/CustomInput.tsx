import { GetRef, Input } from "antd";
import { forwardRef } from "react";
import { CustomInputProps } from "./@types/@customInput";
import FormItem from "antd/es/form/FormItem";
import "./_customInput.css";

const CustomInput = forwardRef<GetRef<typeof Input>, CustomInputProps>(
  (
    {
      type = "text",
      label = "",
      name,
      className,
      placeholder,
      rules,
      size,
      addonBefore,
      maxLength,

      // form items props
      colon = false,
      dependencies,
      valuePropName,
      validateStatus,
      validateFirst = false,
      validateDebounce,
      trigger,
      validateTrigger,
      tooltip,
      shouldUpdate = false,
      // required = false,
      preserve = true,
      noStyle = false,
      messageVariables,
      labelCol,
      labelAlign = "right",
      initialValue,
      hidden = false,
      help,
      getValueProps,
      hasFeedback = false,
      getValueFromEvent,
      extra,
      ...otherProps //todo check every component that uses this not properly
    },
    ref
  ) => {
    // const handleNormalize = useCallback((value: any) => {
    //   if (value == null) return "";
    //   if (typeof value === "string") {
    //     return farsiNumberToEnglish(value);
    //   }
    //   return value;
    // }, []);
    return (
      <section className="custom-input-root w-full">
        <FormItem
          label={label}
          htmlFor={name}
          className={className}
          name={name}
          rules={rules}
          colon={colon}
          dependencies={dependencies}
          valuePropName={valuePropName}
          validateStatus={validateStatus}
          validateFirst={validateFirst}
          validateDebounce={validateDebounce}
          trigger={trigger}
          validateTrigger={validateTrigger}
          tooltip={tooltip}
          shouldUpdate={shouldUpdate}
          // required={required}
          preserve={preserve}
          noStyle={noStyle}
          // normalize={handleNormalize}
          messageVariables={messageVariables}
          labelCol={labelCol}
          labelAlign={labelAlign}
          initialValue={initialValue}
          hidden={hidden}
          help={help}
          hasFeedback={hasFeedback}
          getValueProps={getValueProps}
          extra={extra}
          getValueFromEvent={getValueFromEvent}
        >
          <Input
            className="text-text-400"
            id={name}
            aria-label={label === null ? "entry label" : label?.toString()}
            name={name}
            placeholder={placeholder}
            type={type}
            size={size}
            addonBefore={addonBefore}
            maxLength={maxLength}
            ref={ref}
            {...otherProps}
          />
        </FormItem>
      </section>
    );
  }
);

CustomInput.displayName = "CustomInput";
export default CustomInput;
