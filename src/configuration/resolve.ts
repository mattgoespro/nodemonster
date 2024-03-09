/* eslint-disable @typescript-eslint/no-var-requires */

import path from "path";
import nodemonDefaultConfig from "nodemon/lib/config/defaults";
import { Configuration } from "./config";

const CONFIGURATION_FILE_NAME = "nodemonster.json";

// TODO: Create a default configuration to use in this project
const DEFAULT_CONFIGURATION: Configuration = nodemonDefaultConfig;

export function resolveConfiguration(): Configuration {
  let config = require(path.resolve(process.cwd(), CONFIGURATION_FILE_NAME));
  const pkgJson = require(path.resolve(process.cwd(), "package.json"));

  if (config == null) {
    config = pkgJson.nodemonster;
  }

  config = config ?? DEFAULT_CONFIGURATION;

  let script = process.argv[2];

  if (script == null) {
    script = config.script ?? "";
  }

  if (script == null) {
    script = pkgJson.main;
  }

  if (script == null) {
    throw new Error(
      "No script provided. Please provide a script in the nodemon.config.json or as an argument."
    );
  }

  config.script = path.resolve(process.cwd(), script);
  console.log("Resolved configuration: ");
  console.log(config);

  return config;
}
