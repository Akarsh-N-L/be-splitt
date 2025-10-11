import { readFileSync } from "fs";
import { load } from "js-yaml";
import { join, dirname } from "path";
import { IConfig } from "./utils/interfaces/config.interface";

const configFile = readFileSync(
  join(dirname(__dirname), "..", "config.yml"),
  "utf-8"
);
const config = load(configFile) as IConfig;

export default config?.config || {};
