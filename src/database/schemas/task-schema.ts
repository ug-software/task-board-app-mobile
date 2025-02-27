/** @format */

import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export default sqliteTable("tasks", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull(),
  project_id: integer("project_id").notNull(),
  date_marked: text("date_marked").default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
  created_at: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});
