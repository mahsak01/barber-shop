// Function to determine the text direction
export function getTextDirection(locale: string): string {
  return locale === "ar" || locale === "fa" ? "rtl" : "ltr";
}
export function getTextPosition(locale: string) {
  return locale === "ar" || locale === "fa" ? "right" : "left";
}

export const normalizeText = (text: string) => {
  if (typeof text === "string") {
    text = text
      .replace(/إ|أ/g, "ا")
      .replace(/ک|ك/g, "ک")
      .replace(/ي|ی/g, "ی")
      .toLowerCase(); // Normalize and convert to lowercase
  }
  return text;
};
// export const isDark = () => {
//   return document.documentElement.classList?.contains("dark");
// };
export const LimitText = (string: string = "", maxLength: number = 0) => {
  if (typeof string !== "string" || maxLength === 0) return "";
  if (string.length <= maxLength) return string;
  return string.substring(0, maxLength) + "...";
};
export const defaultSelectTransformOptions = (
  data:
    | { title: string; id: number; disabled?: boolean; className?: string }[]
    | undefined
) => {
  // Return an empty array if no data is provided
  if (!data || !Array.isArray(data)) {
    return [];
  }

  // Transform the options into desired form
  return data.map((item) => ({
    label: item.title,
    value: item.id.toString(),
    key: item.id,
    code: item.id,
    disabled: item.disabled,
    className: item.className,
    title: item.title,
    item,
  }));
};
