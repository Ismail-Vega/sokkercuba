import { DefaultObject } from "workers-qb";

export type Env = {
  DB: any;
  SALT_TOKEN: string;
  userSession?: DefaultObject;
};
