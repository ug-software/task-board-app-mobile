import { router } from "expo-router";
import { TimePicker } from "../components";
import { taskSchema } from "../database";
import Tasks, { TasksWithProjects } from "../interfaces/task";
import useLoading from "./use-loading";
import useSnack from "./use-snack";
import useSqlite from "./use-sqlite";
import Project from "../interfaces/project";
import useProject from "./use-project";
import { between, asc, eq } from "drizzle-orm";

export default () => {
    const db = useSqlite();
    const loader = useLoading();
    const message = useSnack();
    const cacheProjects : { [key: number]: Project | undefined } = {};
    const { findProjectPerId } = useProject();

    const handleUpdateTask = loader.action(async (values: Partial<Tasks> & { time: TimePicker }) => {
        try{
            var task = values;         

            if(task.created_at === null || task.created_at === undefined){
                task.created_at = new Date();
            }

            if(task.updated_at === null || task.updated_at === undefined){
                task.updated_at = new Date();
            }

            if(task.id === undefined){
                message.schedule({
                    phase: "Não foi possivel identificar registro, tente novamente mais tarde",
                    severity: "warning",
                    variant: "container"
                });

                return;
            }

            //@ts-ignore
            var date_marked = new Date(task.date_marked.getFullYear(), task.date_marked.getMonth(), task.date_marked.getDate(), parseInt(task.time.hour), parseInt(task.time.minutes));            

            await db.update(taskSchema).set({
                ...task,
                created_at: task.created_at.toString(),
                updated_at: new Date().toString(),
                date_marked: date_marked.toString(),
            }).where(eq(taskSchema.id, task.id));

            message.schedule({
                phase: "Sucesso ao editar tarefa",
                severity: "success",
                variant: "container"
            });

            router.navigate("/schedule");
        }catch(err){
            var error = err as Error;
            message.schedule({
                phase: error.message,
                severity: "error",
                variant: "container"
            });
        }
    });

    const handleSaveNewTask = loader.action(async (values: Partial<Tasks> & { time: TimePicker }) => {
        try {
            var date = values.date_marked ? values.date_marked : new Date();

            var task = {
                ...values,
                date: new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(values.time.hour), parseInt(values.time.minutes), 0),
                created_at: new Date(),
                updated_at: new Date()
            } as Tasks;
            
            await db.insert(taskSchema).values({
                ...task,
                date_marked: task.date_marked.toString(),
                created_at: task.created_at.toString(),
                updated_at: task.updated_at.toString(),
            });
    
            message.schedule({
                phase: "Sucesso ao adicionar Tarefa",
                severity: "success",
                variant: "container"
            });
    
            router.navigate("/schedule");
        }catch(err){            
            var error = err as Error;
            message.schedule({
                phase: error.message,
                severity: "error",
                variant: "container"
            });
        }
    });

    const handleChangeStatusPerId = loader.action(async (id: number, status: string) => {
        try{
            await db.update(taskSchema).set({ status }).where(eq(taskSchema.id, id));
            message.schedule({
                phase: "Sucesso ao atualizar status",
                severity: "success",
                variant: "container"
            });

            return true;
        }catch(err){
            var error = err as Error;
            message.schedule({
                phase: error.message,
                severity: "error",
                variant: "container"
            });

            return false;
        }
    });

    const findTaskPerId = loader.action(async (id: number) :Promise<Tasks | null> => {
        var task = (await db.select().from(taskSchema).where(eq(taskSchema.id, id))).find(x => x.id === id);
        
        if(task === undefined){
            return null;
        }

        return {
            ...task,
            date_marked: task.date_marked ? new Date(task.date_marked) : new Date(),
            updated_at: task.updated_at ? new Date(task.updated_at) : new Date(),
            created_at: task.created_at ? new Date(task.created_at) : new Date(),
        };
    });

    const handleValidationTask = (values: Partial<Tasks> & { time: TimePicker }) => {
        var errors = {
            name: "",
            description: "",
            status: "",
            date: "",
            time: "",
            project_id: ""
        };        
        
        if(values.description === undefined || values.description === null || values.description === ""){
            errors["description"] = "Campo 'Descrição' é de preechimento obrigatório.";
        }

        if(values.name === undefined || values.name === null || values.name === ""){
            errors["name"] = "Campo 'Nome' é de preechimento obrigatório.";
        }

        if(values.status === undefined || values.status === null || values.status === ""){
            errors["status"] = "Campo 'Status' é de preechimento obrigatório.";
        }

        if(values.date_marked === undefined || values.date_marked === null){
            errors["date"] = "Campo 'Data' é de preechimento obrigatório.";
        }

        if(values.time === undefined || values.time === null){
            errors["time"] = "Campo 'Horário' é de preechimento obrigatório.";
        }

        if(values.project_id === undefined || values.project_id === null){
            errors["project_id"] = "Campo 'Projeto' é de preechimento obrigatório.";
        }

        return errors;
    };

    const getAllTasks = loader.action(async (): Promise<TasksWithProjects[] | null> => {
        var tasks = await db.select().from(taskSchema);
        
        if(Array.isArray(tasks)){
            return await Promise.all(tasks.map(async x => {
                var project = null;

                if(cacheProjects[x.project_id] !== undefined){
                    project = cacheProjects[x.project_id];
                }else {
                    project = await findProjectPerId(x.project_id);
                    cacheProjects[x.project_id] = project ? project : undefined;
                }

                return {
                    ...x,
                    project,
                    date_marked: x.date_marked !== null ? new Date(x.date_marked) : new Date(),
                    created_at: x.created_at !== null ? new Date(x.created_at) : new Date(),
                    updated_at: x.updated_at !== null ? new Date(x.updated_at) : new Date(),
                }
            }));
        }

        return null;
    });

    const getAllTasksPerDate = loader.action(async (date: Date): Promise<TasksWithProjects[] | null> => {
        var intialDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
        var finalDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
        var tasks = await db.select().from(taskSchema).where(between(taskSchema.date_marked, intialDate.toString(), finalDate.toString())).orderBy(asc(taskSchema.date_marked));
        
        if(Array.isArray(tasks)){
            return await Promise.all(tasks.map(async x => {
                var project = null;

                if(cacheProjects[x.project_id] !== undefined){
                    project = cacheProjects[x.project_id];
                }else {
                    project = await findProjectPerId(x.project_id);
                    cacheProjects[x.project_id] = project ? project : undefined;
                }

                return {
                    ...x,
                    project,
                    date_marked: x.date_marked !== null ? new Date(x.date_marked) : new Date(),
                    created_at: x.created_at !== null ? new Date(x.created_at) : new Date(),
                    updated_at: x.updated_at !== null ? new Date(x.updated_at) : new Date(),
                }
            }));
        }

        return null;
    });

    return { handleValidationTask, handleSaveNewTask, getAllTasks, getAllTasksPerDate, handleChangeStatusPerId, findTaskPerId, handleUpdateTask };
}