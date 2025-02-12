/** @format */

import Project from "./project";

export default interface Tasks {
  id?: number,
  name: string,
  description: string,
  status: string,
  project_id: number,
  date: Date,
  updated_at: Date,
  created_at: Date,
}
  
export interface TasksWithProjects extends Tasks {
  project: Project | undefined | null
}