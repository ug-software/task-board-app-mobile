import Project from "./project";
import Tasks from "./task";

export default interface Notification {
    id: number,
    status: string,
    project_id: number,
    task_id: number,
    project: Project | null,
    task: Tasks | null,
    created_at: Date,
}