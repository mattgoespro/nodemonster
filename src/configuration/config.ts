import fs from "fs";
import { Settings } from "nodemon";
import { log } from "../core/logging/log";
import theme from "../core/logging/themes";
import nodemonInstance from "../nodemon/instance";

export interface Configuration extends Settings {}

export function watchConfigurationChanges(configFilePath: string, cliOptions: Configuration) {
  return [
    fs.watchFile(configFilePath, { interval: 1000 }, (curr, prev) => {
      if (curr.mtime > prev.mtime) {
        log(theme, "Restarting due to changes in configuration file", {
          color: "orange",
          bold: true
        });
        nodemonInstance(configFilePath, cliOptions).restart();
      }
    })
  ];
}
