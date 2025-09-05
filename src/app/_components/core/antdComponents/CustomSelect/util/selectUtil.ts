type SelectType = {
  disabled?: boolean;
  id: number;
  title: string;
};
export const selectDefaultValueGenerator = (
  data: Partial<SelectType> | Partial<SelectType>[] | undefined
) => {
  if (!data) return undefined;
  if (Array.isArray(data)) {
    return data?.map((item) => {
      return {
        label: item?.title,
        value: item?.id?.toString(),
        key: item?.id,
        code: item?.id,
        children: item?.title,
        disabled: item?.disabled,
        item,
      };
    });
  } else {
    return {
      label: data?.title,
      value: data?.id?.toString(),
      key: data?.id,
      code: data?.id,
      children: data?.title,
      disabled: data?.disabled,
      item: data,
    };
  }
};
