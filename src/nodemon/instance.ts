import fs from "fs";
import nodemon from "nodemon";
import { Configuration, watchConfigurationChanges } from "../configuration/config";
import { resolveConfiguration } from "../configuration/resolve";
import { log } from "../core/logging/log";
import theme from "../core/logging/themes";

let instance: typeof nodemon = null;

let fileWatchers: fs.StatWatcher[] = [];
let firstLoad = true;

export default function watch(configFile: string, cliOptions: Configuration) {
  const resolvedConfiguration = resolveConfiguration(configFile, cliOptions);
  const configValues = resolvedConfiguration.values;

  if (instance == null) {
    instance = nodemon({ ...resolvedConfiguration, verbose: true })
      .on("start", () => {
        log(theme, "\nHot reload server started.", { color: "lightGreen" });
        log(theme, "Waiting for file changes...", { color: "lightBlue" });

        if (resolvedConfiguration.source === "file") {
          fileWatchers = watchConfigurationChanges(resolvedConfiguration.filePath, cliOptions);
        }
      })
      .on("config:update", () => {
        if (firstLoad) {
          firstLoad = false;
          log(theme, "Configuration loaded.", { color: "darkOrange", bold: true });
          log(theme, `Executor: ${configValues.exec}`, { color: "yellow" });
          log(theme, `Watch: ${(configValues.watch ?? []).join(", ")}`, {
            color: "yellow"
          });

          const ignoreFiles = configValues.ignore as string[];
          const ignoreRoot = configValues.ignoreRoot as string[];
          const ignoreStringParts: string[] = [];

          if (ignoreFiles?.length > 0) {
            ignoreStringParts.push(ignoreFiles.join(", "));
          }

          if (ignoreRoot?.length > 0) {
            ignoreStringParts.push(ignoreRoot.join(", "));
          }

          log(theme, `Ignore: ${ignoreStringParts.join(", ")}`, {
            color: "yellow"
          });
          return;
        }
        log(theme, "Configuration updated.", { color: "darkOrange", bold: true });
      })
      .on("quit", () => {
        log(theme, "Exited.");

        fileWatchers.forEach((watcher) => {
          watcher.removeAllListeners();
        });
      })
      .on("restart", () => {
        log(theme, "Restarting...");
      })
      .on("crash", () => {
        log(theme, "Crashed, restarting on change...", { color: "darkOrange" });
      })
      .on("log", (msg) => {
        if (msg.source) {
          console.log(msg.message);
          return;
        }
      });
  }

  return instance;
}
