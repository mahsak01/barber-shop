import { colord, extend } from "colord";
import mixPlugin from "colord/plugins/mix";

extend([mixPlugin]);

export function generateDarkenColorFrom(input: string, percentage = 0.07): string {
  return colord(input).darken(percentage).toHex();
}

export function generateForegroundColorFrom(input: string, percentage = 0.8): string {
  return colord(input)
    .mix(colord(input).isDark() ? "white" : "black", percentage)
    .toHex();
}
