import { projectSchema, taskSchema } from "../database";
import Project from "../interfaces/project";
import { useRouter } from "expo-router";
import useLoading from "./use-loading";
import useSqlite from "./use-sqlite";
import useSnack from "./use-snack";
import useDialog from "./use-dialog";
import { between, asc, eq } from "drizzle-orm";
import { status } from "../constants";

export interface ProjectsAndPercentTaskCompleted extends Project {
    percent_task_completed: number
}

export default () => {
    const dialog = useDialog();
    const loader = useLoading();
    const message = useSnack();
    const router = useRouter();
    const db = useSqlite();

    const handleUpdateProject = loader.action(async (values: Partial<Project>) => {
        try{
            var project = values;

            if(project.created_at === null || project.created_at === undefined){
                project.created_at = new Date();
            }

            if(project.updated_at === null || project.updated_at === undefined){
                project.updated_at = new Date();
            }

            if(project.id === undefined){
                message.schedule({
                    phase: "Não foi possivel identificar registro, tente novamente mais tarde",
                    severity: "warning",
                    variant: "container"
                });

                return;
            }

            await db.update(projectSchema).set({
                ...project,
                created_at: project.created_at.toString(),
                updated_at: project.updated_at.toString()
            }).where(eq(projectSchema.id, project.id));

            message.schedule({
                phase: "Sucesso ao editar Projeto",
                severity: "success",
                variant: "container"
            });

            router.navigate("/projects");
        }catch(err){
            var error = err as Error;
            message.schedule({
                phase: error.message,
                severity: "error",
                variant: "container"
            });
        }
    });
    
    const handleSaveNewProject = loader.action(async (values: Partial<Project>) => {
        try{
            var project = values as Project;

            if(project.created_at === null || project.created_at === undefined){
                project.created_at = new Date();
            }

            if(project.updated_at === null || project.updated_at === undefined){
                project.updated_at = new Date();
            }

            await db.insert(projectSchema).values({
                ...project,
                created_at: project.created_at.toString(),
                updated_at: project.updated_at.toString()
            });

            message.schedule({
                phase: "Sucesso ao adicionar Projeto",
                severity: "success",
                variant: "container"
            });

            router.navigate("/projects");
        }catch(err){
            var error = err as Error;
            message.schedule({
                phase: error.message,
                severity: "error",
                variant: "container"
            });
        }
    });

    const getAllProjects = loader.action(async (): Promise<Project[] | null> => {
        var projects = await db.select().from(projectSchema);

        if(Array.isArray(projects)){
            return projects.map(x => ({
                ...x,
                created_at: x.created_at !== null ? new Date(x.created_at) : new Date(),
                updated_at: x.updated_at !== null ? new Date(x.updated_at) : new Date(),
            }));
        }

        return null;
    });

    const findProjectPerId = loader.action(async (id: number): Promise<Project | null> => {
        let project = (await db.select().from(projectSchema).where(eq(projectSchema.id, id))).find(x => x.id === id);
        
        if(project === undefined){
            return null;
        }
        
        return {
            ...project,
            updated_at: project.updated_at ? new Date(project.updated_at) : new Date(),
            created_at: project.created_at ? new Date(project.created_at) : new Date(),
        };
    });

    const handleDeleteProjectPerId = (id: number, confirm: () => void) => {
        dialog.on({
            description: "Deseja realmente deletar este projeto, ao confirmar a exclusão estará deletando também suas terefas, elas não poderão ser recuperadas posteriormente",
            title: "Deletar Projeto",
            onConfirm: async (isTrue) => {                
                if(isTrue){
                    const [project, tasks] = await Promise.all([
                        db.delete(projectSchema).where(eq(projectSchema.id, id)),
                        db.delete(taskSchema).where(eq(taskSchema.project_id, id))
                    ]);
                    if(project && tasks){
                        message.schedule({
                            phase: "Projeto e tarefas deletadas com sucesso",
                            severity: "success",
                            variant: "container"
                        });

                    }else {
                        message.schedule({
                            phase: "Não foi possivel deletar, tente novamente mais tarde",
                            severity: "error",
                            variant: "container"
                        });
                    }
                }

                confirm();
            }
        })
    };

    const getProjectsAndTasksPercentFinishPerDay = loader.action(async (date: Date) => {
        var initialDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
        var finalDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
        var tasks = await db.select().from(taskSchema).where(between(taskSchema.date_marked, initialDate.toString(), finalDate.toString())).orderBy(asc(taskSchema.date_marked));
        
        var projects = [] as ProjectsAndPercentTaskCompleted[];

        if(Array.isArray(tasks)){
            const projectsId = [...new Set(tasks.map(x => x.project_id))];            

            await Promise.all(projectsId.map(async projectId => {
                //caso exista na lista pula...                
                if(projects.filter(x => x.id === projectId).length > 0){
                    return;
                }

                var project = (await db.select().from(projectSchema).where(eq(projectSchema.id, projectId))).find(x => x.id === projectId);
                var tasksPerProject = tasks.filter(x => x.project_id === projectId);
                var tasksCompleted = tasksPerProject.filter(x => x.status === status.completed.name || x.status === status.inactive.name);                

                if(!project){
                    return;
                }               

                projects.push({
                    ...project,
                    percent_task_completed: tasksCompleted.length === 0 ? 0 : Number.parseInt(((tasksCompleted.length / tasksPerProject.length) * 100).toFixed(2)),
                    updated_at: project.updated_at ? new Date(project.updated_at) : new Date(),
                    created_at: project.created_at ? new Date(project.created_at) : new Date(),
                });

                //devolve uma promisse para que espere a interação acabar...
                return project;
            }));
        }

        return projects;
    });

    const handleValidationProject = (values: Partial<Project>) => {
        var errors = {
            name: "",
            description: "",
            color: "",
            icon: ""
        };        
        
        if(values.description === undefined || values.description === null || values.description === ""){
            errors["description"] = "Campo 'Descrição' é de preechimento obrigatório.";
        }

        if(values.name === undefined || values.name === null || values.name === ""){
            errors["name"] = "Campo 'Nome' é de preechimento obrigatório.";
        }

        if(values.color === undefined || values.color === null || values.color === ""){
            errors["color"] = "Campo 'Cor' é de preechimento obrigatório.";
        }

        if(values.icon === undefined || values.icon === null || values.icon === ""){
            errors["icon"] = "Campo 'Icone' é de preechimento obrigatório.";
        }

        return errors;
    };

    return { handleSaveNewProject, handleUpdateProject, handleValidationProject, handleDeleteProjectPerId, getAllProjects, findProjectPerId, getProjectsAndTasksPercentFinishPerDay };
}