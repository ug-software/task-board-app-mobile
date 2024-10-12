/** @format */

import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export default sqliteTable("projects", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  updated_at: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
  created_at: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
});
