/** @format */

import taskSchema from "./schemas/task-schema";
import projectSchema from "./schemas/project-schema";
import userSchema from "./schemas/user-schema";
import notificationSchema from "./schemas/notification-schema";
import { openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

const DB_NAME = "database.db";
const expoDb = openDatabaseSync(DB_NAME);
export default drizzle(expoDb);

export { DB_NAME, expoDb }
export { taskSchema, projectSchema, notificationSchema, userSchema };
