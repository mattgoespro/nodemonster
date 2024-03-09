import nodemonInstance from "../../nodemon/instance";
import { bold, colored } from "./formatting";
import { Theme, LogThemeColors } from "./themes";

export function log(
  theme: Theme,
  message: string,
  options: { color?: keyof LogThemeColors; bold?: boolean } = {}
) {
  const prefix = (msg: string) => `[nodemon] ${msg}`;

  message.split("\n").forEach((msgPart) => {
    if (msgPart.trim().length === 0) {
      nodemonInstance().emit("log", { message: "", source: "launcher" });
      return;
    }

    let logString = colored(theme, msgPart, options.color);

    if (options.bold) {
      logString = bold(colored(theme, msgPart, options.color));
    }

    nodemonInstance().emit("log", { message: prefix(logString), source: "launcher" });
  });
}
