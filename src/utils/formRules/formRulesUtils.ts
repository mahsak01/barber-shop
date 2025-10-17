export const REQUIRED_RULES = (msg?: string) => {
  if (msg) {
    return { required: true, message: msg };
  } else {
    return { required: true, message: "فیلد الزامیست" };
  }
};
