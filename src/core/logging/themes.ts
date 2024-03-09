export interface LogThemeColors {
  red: string;
  lightRed: string;
  darkRed: string;
  green: string;
  lightGreen: string;
  darkGreen: string;
  blue: string;
  lightBlue: string;
  darkBlue: string;
  yellow: string;
  lightYellow: string;
  darkYellow: string;
  orange: string;
  lightOrange: string;
  darkOrange: string;
  pink: string;
  lightPink: string;
  darkPink: string;
  purple: string;
  lightPurple: string;
  darkPurple: string;
  grey: string;
  lightGrey: string;
  darkGrey: string;
  black: string;
  white: string;
}

const DefaultLogTheme: LogThemeColors = {
  red: "#F44336",
  lightRed: "#f5665c",
  darkRed: "#a80508",
  pink: "#E91E63",
  lightPink: "#f75d8d",
  darkPink: "#a2144d",
  purple: "#9C27B0",
  lightPurple: "#b46dd3",
  darkPurple: "#6a1b7a",
  blue: "#1c78c4",
  lightBlue: "#5bc3f3",
  darkBlue: "#0a4a7f",
  green: "#8BC34A",
  lightGreen: "#CDDC39",
  darkGreen: "#5B8C00",
  yellow: "#FFC107",
  lightYellow: "#FFEB3B",
  darkYellow: "#FFA000",
  orange: "#ff891b",
  lightOrange: "#ffa53e",
  darkOrange: "#FF5722",
  white: "#FAFAFA",
  black: "#141414",
  grey: "#9E9E9E",
  lightGrey: "#E0E0E0",
  darkGrey: "#424242"
};

const MaterialDesign: LogThemeColors = {
  red: "#F44336",
  green: "#4CAF50",
  blue: "#2196F3",
  yellow: "#FFEB3B",
  orange: "#FF9800",
  pink: "#E91E63",
  purple: "#9C27B0",
  grey: "#9E9E9E",
  black: "#000000",
  white: "#FFFFFF",
  lightRed: "#FFCDD2",
  lightGreen: "#C8E6C9",
  lightBlue: "#BBDEFB",
  lightYellow: "#FFF9C4",
  lightOrange: "#FFE0B2",
  lightPink: "#F8BBD0",
  lightPurple: "#E1BEE7",
  lightGrey: "#EEEEEE",
  darkRed: "#B71C1C",
  darkGreen: "#1B5E20",
  darkBlue: "#0D47A1",
  darkYellow: "#F57F17",
  darkOrange: "#E65100",
  darkPink: "#880E4F",
  darkPurple: "#4A148C",
  darkGrey: "#424242"
};

const Atom: LogThemeColors = {
  red: "#FB5A5A",
  green: "#A2CD5A",
  blue: "#5AB7E2",
  yellow: "#E9D18B",
  orange: "#FFAB4A",
  pink: "#FF75B5",
  purple: "#B084EB",
  grey: "#ABB2BF",
  black: "#282C34",
  white: "#FFFFFF",
  lightRed: "#FFA8A8",
  lightGreen: "#D8EBCD",
  lightBlue: "#B3D9F2",
  lightYellow: "#F4E0A6",
  lightOrange: "#FFCC80",
  lightPink: "#FFB3D9",
  lightPurple: "#D9B3FF",
  lightGrey: "#CED4DA",
  darkRed: "#C33E40",
  darkGreen: "#5B9D48",
  darkBlue: "#6699CC",
  darkYellow: "#D7AE41",
  darkOrange: "#D4843E",
  darkPink: "#B656B6",
  darkPurple: "#A473E8",
  darkGrey: "#5C6773"
};

const VSCode: LogThemeColors = {
  red: "#D16969",
  green: "#4EC9B0",
  blue: "#69A5E5",
  yellow: "#FFD866",
  orange: "#FFA94D",
  pink: "#C594C5",
  purple: "#B084EB",
  grey: "#ABB2BF",
  black: "#1E1E1E",
  white: "#FFFFFF",
  lightRed: "#FF8A80",
  lightGreen: "#A5D6A7",
  lightBlue: "#90CAF9",
  lightYellow: "#FFE082",
  lightOrange: "#FFCC80",
  lightPink: "#F48FB1",
  lightPurple: "#CE93D8",
  lightGrey: "#CFD8DC",
  darkRed: "#BA6B6C",
  darkGreen: "#53ACA8",
  darkBlue: "#5479A3",
  darkYellow: "#EFA82A",
  darkOrange: "#F17D0B",
  darkPink: "#C686C7",
  darkPurple: "#9C6FBB",
  darkGrey: "#4D5666"
};

export const LogThemes = {
  default: DefaultLogTheme,
  "material-design": MaterialDesign,
  atom: Atom,
  vscode: VSCode
};

type LogThemeMap = typeof LogThemes;

export type Theme = keyof LogThemeMap;

export function getColor(color: keyof LogThemeColors): string {
  return LogThemes[color];
}

let currentTheme: Theme = "default";

export function setTheme(theme: Theme = "default") {
  currentTheme = theme;
}

export default currentTheme;
