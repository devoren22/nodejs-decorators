import express from "express";
import { Inject, Service } from "typedi";

import { ConfigService } from "../configuration/configuration";
import { initControllersAndGateways } from "../initializer";

@Service()
export class Server<ConfigType> {
  @Inject()
  private configService: ConfigService<ConfigType>;

  static app = express();

  constructor() {}

  /**
   * @param {number} port
   */
  async run(port: number, srcPath: string) {
    Server.app.use(express.json());
    Server.app.use(express.urlencoded({ extended: true }));

    Server.app.listen(port, () => console.log(`Listening on port ${port}`));

    initControllersAndGateways({ dir: srcPath });
  }

  load<T extends ConfigType>(loadPath: string, configuration: () => T) {
    require("dotenv").config({ path: loadPath });
    this.configService.load(configuration());
  }
}
