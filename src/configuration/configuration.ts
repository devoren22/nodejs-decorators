import { Service } from "typedi";

export type AppConfiguration = {
  port: number;
  database: {
    username: string;
    password: string;
    host: string;
    name: string;
  };
  secretTokenKey: string;
  stam: string;
};

export default (): AppConfiguration => ({
  port: 5317,
  database: {
    username: process.env.DATABASE_USERNAME || "",
    password: process.env.DATABASE_PASSWORD || "",
    name: process.env.DATABASE_NAME || "",
    host: process.env.DATABASE_HOST || "localhost",
  },
  secretTokenKey: process.env.SECRET_TOKEN_KEY || "",
  stam: process.env.STAM || "no",
});

@Service()
export class ConfigService<T> {
  private _configLoaded: T;

  get<K extends keyof T>(key?: K): T[K] | T {
    if (!key) return this._configLoaded;

    return this._configLoaded[key];
  }

  load(config: T) {
    this._configLoaded = config;
  }
}
