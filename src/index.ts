import "reflect-metadata";

import { Server } from "./common/server";

export { Server };
export * from "./common/types";
export { ConfigService } from "./configuration/configuration";
export * from "./express";
export * from "./socket-io";

import { main } from "./example";

main();
