/** @format */

import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import * as schema from "../database";

export default () => {
  const database = useSQLiteContext();

  return drizzle(database, { schema });
};
