/** @format */

import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export default sqliteTable("child-tasks", {
  id: integer("id").primaryKey(),
  description: text("description"),
  status: text("status").notNull(),
  task_id: integer("task_id").notNull(),
  updated_at: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
  created_at: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});
