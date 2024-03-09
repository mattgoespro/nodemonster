import { LogThemeColors, LogThemes, Theme } from "./themes";

export function colored(theme: Theme, message: string, color: keyof LogThemeColors): string {
  const resetColor = "\x1b[0m";
  const hexCode = LogThemes[theme][color] as string;
  const colorCode = `\x1b[38;2;${parseInt(hexCode.substring(1, 2), 16)};${parseInt(hexCode.substring(3, 2), 16)};${parseInt(hexCode.substring(5, 2), 16)}m`;
  return `${colorCode}${message}${resetColor}`;
}

export function bold(message: string): string {
  return `\x1b[1m${message}\x1b[0m`;
}
