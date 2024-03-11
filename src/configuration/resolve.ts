/* eslint-disable @typescript-eslint/no-var-requires */

import path from "path";
import defaultConfig from "../nodemon.json";
import { Configuration } from "./config";

export const CONFIGURATION_DEFAULT_FILE_NAME = "nodemonster.json";

const nodemonConfig: Configuration = defaultConfig;

type ResolvedConfiguration = {
  source: "cli" | "file" | "package" | "none";
  values: Configuration;
  filePath?: string;
};

const projectRoot = path.resolve(process.cwd());

function consolidate(config: Configuration = {}, cliOptions: Configuration = {}): Configuration {
  return {
    ...nodemonConfig,
    ...config,
    script: path.resolve(process.cwd(), config.script),
    ...cliOptions
  };
}

export function resolveConfiguration(
  configFile: string,
  cliOptions: Configuration
): ResolvedConfiguration {
  let source: ResolvedConfiguration["source"] = "none";
  let config = require(path.resolve(process.cwd(), configFile));
  let filePath = path.resolve(process.cwd(), configFile);

  if (config == null) {
    const packageJsonPath = path.join(projectRoot, "package.json");

    let packageJSON = null;

    if (!require.resolve(packageJsonPath)) {
      packageJSON = require(packageJsonPath);

      const pkgJsonConfig = packageJSON?.nodemonster;

      if ("nodemonster" in packageJSON && Object.keys(pkgJsonConfig).length > 0) {
        source = "package";
        filePath = packageJsonPath;
        config = packageJSON?.nodemonster;
      }

      if (config == null) {
        source = "cli";
        config = {};
      }
    }

    return {
      source,
      filePath,
      values: consolidate(config, cliOptions)
    };
  }
}
