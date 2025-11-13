/** @format */

import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "./schemas/index";

// Nome do banco de dados
export const DB_NAME = "database.db";

// Abre (ou cria) o banco local
const expoDb = openDatabaseSync(DB_NAME);

// Inicializa o Drizzle com os schemas
export const db = drizzle(expoDb, { schema });

// Exporta os schemas também, se precisar usar em migrations, etc.
export * from "./schemas/index";
export default db;
