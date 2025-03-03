/** @format */
import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export default sqliteTable("notification", {
  id: integer("id").primaryKey(),
  status: text("status").notNull(),
  project_id: integer("project_id").notNull(),
  task_id: integer("task_id").notNull(),
  created_at: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});
