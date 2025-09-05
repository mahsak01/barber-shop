import { GetProps, Input } from "antd";
import FormItem from "antd/es/form/FormItem";

export type CustomInputProps = GetProps<typeof Input> &
  GetProps<typeof FormItem> & { hasVerticalLabel?: boolean };
