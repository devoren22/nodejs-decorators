import { Server } from "../common/server";
import Container from "typedi";
import configuration from "../configuration/configuration";

/**
 * Example of using this npm package
 * That's how you suppose to run the server
 * Choose
 */
export async function main() {
  const server = Container.get<Server<any>>(Server);
  // // Load configuration env variables
  server.load(process.env.NODE_ENV || "development.env", configuration);

  server.run(5316, __dirname);
}
