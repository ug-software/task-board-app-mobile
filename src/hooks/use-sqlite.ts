/** @format */

import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import * as schema from "../database";

const useDatabase = () => {
  const database = useSQLiteContext();

  return drizzle(database, { schema });
};

export default useDatabase;
