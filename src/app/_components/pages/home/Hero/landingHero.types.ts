type SelectType = {
  label: string;
  title: string;
  value: string;
  key: number;
  item: {
    id: number;
    title: string;
  };
  code: number;
};

export type HeroFormDataType = {
  city: SelectType;
  gender:SelectType;
  serviceType: SelectType;
  date: string;
};
