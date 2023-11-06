import "reflect-metadata";

// import Container from "typedi";

import { Server } from "./common/server";

export { Server };

// import configuration from "./configuration/configuration";

// import Container from "typedi";
export * from "./common/types";
export { ConfigService } from "./configuration/configuration";
export * from "./express";
export * from "./socket-io";

// async function main() {
//   const server = Container.get<Server<any>>(Server);
//   // // Load configuration env variables
//   server.load(process.env.NODE_ENV || "development.env", configuration);

//   server.run(5316, __dirname);
// }
// main();
