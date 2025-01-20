/** @format */

import { userSchema } from "@/src/database";
import { useSqlite } from "@/src/hooks";
import Project from "@/src/interfaces/project";

export default async (project: Project) => {
  const db = useSqlite();

  return await db.insert(userSchema).values(project);
};
