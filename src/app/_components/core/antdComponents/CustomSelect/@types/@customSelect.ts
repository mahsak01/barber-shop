import { ReactNode } from "react";
import { ColProps, GetProps, Select, SelectProps } from "antd";
import { FormInstance, Rule } from "antd/es/form";
import { LabelTooltipType } from "antd/es/form/FormItemLabel";
import { FormLabelAlign, NamePath, Store } from "antd/es/form/interface";
import { FeedbackIcons } from "antd/es/form/FormItem";

type ShouldUpdate<Values = any> =
  | boolean
  | ((
      prevValues: Values,
      nextValues: Values,
      info: {
        source?: string;
      }
    ) => boolean);

export type CustomSelectProps = GetProps<typeof Select> & {
  label?: string;
  name: string;
  className?: string;
  otherProps?: SelectProps;
  defaultValue?: any;
  options:
    | {
        id: number;
        code?: number;
        title: string;
        disabled?: boolean;
        className?: string;
        label?: string;
        value?: string;
      }[]
    | undefined;
  rules?: Rule[];
  isLoading?: boolean;
  onClick?: () => void;
  mode?: "multiple" | "tags" | undefined;
  disabled?: boolean;
  form?: FormInstance<any>;
  maxTagCount?: number | "responsive" | undefined;
  transformOptions?: (data: any) => {
    value: string;
    label: string;
    key?: number;
    item?: object;
    disabled?: boolean;
    title?: string;
    className?: string;
    code?: number;
  }[];
  placeholder?: string;
  colon?: boolean;
  valuePropName?: string;
  dependencies?: NamePath[];
  validateStatus?: "" | "success" | "warning" | "error" | "validating" | undefined;
  validateFirst?: boolean | "parallel" | undefined;
  validateDebounce?: number | undefined;
  trigger?: string | undefined;
  validateTrigger?: string | false | string[] | undefined;
  tooltip?: LabelTooltipType;
  required?: boolean;
  preserve?: boolean;
  noStyle?: boolean;
  hidden?: boolean;
  shouldUpdate?: ShouldUpdate<string>;
  normalize?: ((value: any, prevValue: any, allValues: Store) => any) | undefined;
  messageVariables?: Record<string, string>;
  labelCol?: ColProps;
  labelAlign?: FormLabelAlign;
  initialValue?: any;
  hasFeedback?:
    | boolean
    | {
        icons: FeedbackIcons;
      };
  getValueProps?: (value: any) => Record<string, unknown>;
  getValueFromEvent?: (...args: any) => any;
  extra?: ReactNode;
  help?: ReactNode;
  notFoundContent?: ReactNode;
  hasVerticalLabel?: boolean;
};

export type SelectedOption = {
  key: string;
  value: string;
  label: string;
  disabled?: boolean;
  title?: string;
  className?: string;
  name: string;
  code: number;
  item: {
    id: number;
    title: string;
  };
};
