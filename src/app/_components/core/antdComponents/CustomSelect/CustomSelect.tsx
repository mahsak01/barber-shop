"use client";
import { forwardRef } from "react";
import { Form, GetRef, Select } from "antd";
import { defaultSelectTransformOptions, normalizeText } from "@/utils/global/common";
import { CustomSelectProps, SelectedOption } from "./@types/@customSelect";
import "./_customSelect.css";

const CustomSelect = forwardRef<GetRef<typeof Select>, CustomSelectProps>(
  (
    {
      label,
      name,
      className,
      options,
      onChange,
      rules,
      isLoading,
      onClick,
      mode,
      disabled = false,
      transformOptions = defaultSelectTransformOptions,
      form,
      maxTagCount,

      // Form Items
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
      normalize,
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
      notFoundContent,
      hasVerticalLabel = true,
      ...otherProps
    },
    ref
  ) => {
    return (
      <Form.Item
        label={label}
        htmlFor={name}
        className={`custom-select-container ${hasVerticalLabel && "vertical-label"} ${className ? className : ""}`}
        name={name}
        rules={rules}
        // Form Items

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
        normalize={normalize}
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
        <Select
          notFoundContent={notFoundContent}
          aria-label={label}
          onChange={
            ((_: any, option: SelectedOption[] | SelectedOption) => {
              form?.setFieldsValue({
                [name]: option,
              });
              onChange?.(_, option);
            }) as any
          }
          loading={isLoading}
          onClick={onClick}
          mode={mode}
          showSearch
          disabled={disabled}
          maxTagCount={maxTagCount}
          filterOption={(input, option) => {
            return (
              normalizeText(option?.label as string)?.includes(
                normalizeText(input)?.toLowerCase()
              ) ?? false
            );
          }}
          options={transformOptions(options)?.map(
            ({ value, label, key, item, disabled, className, title, code }) => {
              return {
                // children, // built in into antd
                className, // built in into antd
                disabled, // built in into antd
                label, // built in into antd
                title, // built in into antd
                value, // built in into antd
                key, //! added by us
                item, //! added  by us
                code, //! added  by us
              };
            }
          )}
          ref={ref}
          {...otherProps}
        >
          {transformOptions(options)?.map(({ value, label, key, item, disabled }) => {
            return (
              <Select.Option
                name={name}
                key={value}
                value={value}
                code={key}
                item={item}
                disabled={disabled}
              >
                {label}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    );
  }
);

CustomSelect.displayName = "CustomSelect";
export default CustomSelect;
