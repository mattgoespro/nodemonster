import { createOption, program } from "commander";
import { CONFIGURATION_DEFAULT_FILE_NAME } from "./configuration/resolve";
import { LogThemes } from "./core/logging/themes";
import watch from "./nodemon/instance";

const commander = program
  .version("1.0.0")
  .description("A customizable nodemon wrapper for Node.")
  .addOption(
    createOption("--theme [theme]", "Render console log output with predefined theme colors.")
      .choices(Object.keys(LogThemes))
      .default("Material Design", "Material Design Theme")
  )
  .addOption(
    createOption("-c,--config [config]", "Path to the configuration file.").default(
      CONFIGURATION_DEFAULT_FILE_NAME,
      null
    )
  )
  .addOption(createOption("-w,--watch [files]", "Files to watch for changes."))
  .action((options) => {
    watch(options.config, {
      watch: options.watch,
      theme: options.theme
    });
  });

commander.parse();
