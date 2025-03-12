/** @format */

import { projectSchema } from "@/src/database";
import { useSqlite } from "@/src/hooks";
import Project from "@/src/interfaces/project";

export default async (project: Project) => {
  const db = useSqlite();

  return await db.insert(projectSchema).values({
    ...project,
    updated_at: project.updated_at.toString(),
    created_at: project.created_at.toString()
  });
};
