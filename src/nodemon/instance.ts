import fs from "fs";
import nodemon from "nodemon";
import { watchConfigurationChanges } from "../configuration/config";
import { resolveConfiguration } from "../configuration/resolve";
import { log } from "../core/logging/log";
import theme from "../core/logging/themes";

let instance: typeof nodemon = null;

let fileWatchers: fs.StatWatcher[] = [];
let firstLoad = true;

export default function startNodemon() {
  const configuration = resolveConfiguration();

  if (instance == null) {
    instance = nodemon({ ...configuration, verbose: true })
      .on("start", () => {
        log(theme, "\nHot reload server started.", { color: "lightGreen" });
        log(theme, "Waiting for file changes...", { color: "lightBlue" });

        fileWatchers = watchConfigurationChanges();
      })
      .on("config:update", () => {
        if (firstLoad) {
          firstLoad = false;
          log(theme, "Configuration loaded.", { color: "darkOrange", bold: true });
          log(theme, `Executor: ${configuration.exec}`, { color: "yellow" });
          log(theme, `Watch: ${(configuration.watch ?? []).join(", ")}`, { color: "yellow" });

          const ignoreFiles = configuration.ignore as string[];
          const ignoreRoot = configuration.ignoreRoot as string[];
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
      .on("log", (msg: nodemon.LogMessage & { source?: "launcher" }) => {
        if (msg.source) {
          console.log(msg.message);
          return;
        }
      });
  }

  return instance;
}
