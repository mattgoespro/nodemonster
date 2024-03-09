import fs from "fs";
import path from "path";
import { Settings } from "nodemon";
import { log } from "../core/logging/log";
import theme from "../core/logging/themes";
import nodemonInstance from "../nodemon/instance";
import { resolveConfiguration } from "./resolve";

export interface Configuration extends Settings {}

export function watchConfigurationChanges() {
  return [
    fs.watchFile(
      path.resolve(__dirname, "nodemon.config.json"),
      { interval: 1000 },
      (curr, prev) => {
        if (curr.mtime > prev.mtime) {
          log(theme, "Restarting due to changes in configuration file", {
            color: "orange",
            bold: true
          });
          nodemonInstance()(resolveConfiguration()).restart();
        }
      }
    )
  ];
}
