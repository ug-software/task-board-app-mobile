import Tasks, { TasksWithProjects } from "../interfaces/task";
import useNotification from "./use-notification";
import Project from "../interfaces/project";
import { TimePicker } from "../components";
import Task from "../models/task-model";
import useProject from "./use-project";
import useLoading from "./use-loading";
import { status } from "../constants";
import { router } from "expo-router";
import useDialog from "./use-dialog";
import useSnack from "./use-snack";
import { getNumberOfMinutesBetweenTwoDates, getNumberOfSecondsBetweenTwoDates } from "../utils/date";

export default () => {
    const dialog = useDialog();
    const loader = useLoading();
    const message = useSnack();
    const { findProjectPerId } = useProject();
    const notification = useNotification();
    const cacheProjects : { [key: number]: Project | undefined } = {};

    const handleUpdateTask = loader.action(async (values: Partial<Tasks> & { time: TimePicker }) => {
        try{        

            if(values.created_at === null || values.created_at === undefined){
                values.created_at = new Date();
            }

            if(values.updated_at === null || values.updated_at === undefined){
                values.updated_at = new Date();
            }

            if(values.id === undefined){
                message.schedule({
                    phase: "Não foi possivel identificar registro, tente novamente mais tarde",
                    severity: "warning",
                    variant: "container"
                });

                return;
            }

            //@ts-ignore
            var date_marked = new Date(values.date_marked.getFullYear(), values.date_marked.getMonth(), values.date_marked.getDate(), parseInt(values.time.hour), parseInt(values.time.minutes));
            await Task.updatePerId(values.id, {...values, date_marked });

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
            var date = values.date_marked ? new Date(values.date_marked) : new Date();

            var task = {
                ...values,
                date_marked: new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(values.time.hour), parseInt(values.time.minutes), 0),
                created_at: new Date(),
                updated_at: new Date()
            } as Tasks;
            
            await Task.insert(task);
    
            message.schedule({
                phase: "Sucesso ao adicionar Tarefa",
                severity: "success",
                variant: "container"
            });
            
            task.date_marked.setMinutes(-15);
            var seconds = getNumberOfSecondsBetweenTwoDates(new Date(), task.date_marked);
            
            notification.schedule({
                content: {
                    title: "Task Manager",
                    body: `A tarefa ${task.name} esta para começar!`
                },
                trigger: {
                    seconds
                }
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
            await Task.changeStatusPerId(id, status);
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
        var task = await Task.findPerId(id);
        
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

    const handleDeleteTasksPerId = loader.action(async (id: number, confirm: () => void) => {
        dialog.on({
            description: "Deseja realmente deletar esta tarefa, ao confirmar a exclusão não podera ser recuperada posteriormente",
            title: "Deletar Tarefa",
            onConfirm: async (isTrue) => {                
                if(isTrue){
                    const [ tasks ] = await Promise.all([
                        Task.deletePerId(id),
                    ]);
                    if(tasks){
                        message.schedule({
                            phase: "Tarefa deletada com sucesso",
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
        var tasks = await Task.findAll();
        
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
        var tasks = await Task.findAllPerDate(date);
        
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

    const getAllTasksBetweenDates = loader.action(async (initialDate: Date, finalDate: Date) => {
        var tasks = await Task.findAllBetweenDates(initialDate, finalDate);
        
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

    const getPercentTasksCompletedPerDate = loader.action(async (date: Date) => {
        var tasks = Task.findAllPerDate(date);
        
        if(Array.isArray(tasks)){
            var tasksCompleted = tasks.filter(x => x.status === status.completed.name || x.status === status.inactive.name);
            
            if(tasksCompleted.length > 0){
                return Number.parseInt(((tasksCompleted.length / tasks.length) * 100).toFixed(2));
            }
        }

        return 0;
    });

    return {
        handleValidationTask,
        handleSaveNewTask,
        getAllTasks,
        getAllTasksPerDate,
        handleChangeStatusPerId,
        findTaskPerId,
        handleUpdateTask,
        handleDeleteTasksPerId,
        getPercentTasksCompletedPerDate,
        getAllTasksBetweenDates
    };
}