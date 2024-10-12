/** @format */

import { useSqlite } from "@/src/hooks";

export default async () => {
  const db = useSqlite();

  return await db.query.projectSchema.findMany();
};
