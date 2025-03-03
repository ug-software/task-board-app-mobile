/** @format */
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export default sqliteTable("user", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  email:  text("email").notNull(),
  img:  text("img").notNull(),
});
