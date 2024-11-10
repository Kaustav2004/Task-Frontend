import React, { createContext, useState, useEffect, ReactNode, FC } from 'react';

export const TaskContext = createContext<any>(null);

interface TaskProviderProps {
    children: ReactNode;
}

interface TaskType {
    id: number;
    title: string;
    description: string;
    deadline: string;
    status: string;
}

interface TaskContextType {
    alltasks: TaskType[];
    setallTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
    completedTask: TaskType[];
    setcompletedTask: React.Dispatch<React.SetStateAction<TaskType[]>>;
    toDoTask: TaskType[];
    settoDoTask: React.Dispatch<React.SetStateAction<TaskType[]>>;
    expireTask: TaskType[];
    setexpireTask: React.Dispatch<React.SetStateAction<TaskType[]>>;
    inprogressTask: TaskType[];
    setinprogressTask: React.Dispatch<React.SetStateAction<TaskType[]>>;
    openAddTask: boolean;
    setopenAddTask: React.Dispatch<React.SetStateAction<boolean>>;
    addTask: (data: { title: string; desc: string; deadline: string }) => Promise<void>;
}

const TaskProvider: FC<TaskProviderProps> = ({ children }) => {
    const [alltasks, setallTasks] = useState<TaskType[]>([]);
    const [completedTask, setcompletedTask] = useState<TaskType[]>([]);
    const [toDoTask, settoDoTask] = useState<TaskType[]>([]);
    const [expireTask, setexpireTask] = useState<TaskType[]>([]);
    const [inprogressTask, setinprogressTask] = useState<TaskType[]>([]);
    const [openAddTask, setopenAddTask] = useState(false);
    const [loading, setloading] = useState<Boolean>(false);
    const [taskSuccess, settaskSuccess] = useState<Boolean>(false);
    const [rerender, setrerender] = useState<Boolean>(true);

    const addTask = async (data: { title: string; desc: string; deadline: string }) => {
        try {
            const response = await fetch('https://task-backend-kb1l.onrender.com/api/v1/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: data.title,
                    description: data.desc,
                    deadline: data.deadline,
                }),
            });
            const dataJson = await response.json();
            if (dataJson.success) {
                setopenAddTask(false);
                setallTasks((prevTasks) => [...prevTasks, dataJson.response]);
                settoDoTask((prevTasks) => [...prevTasks, dataJson.response]);
                settaskSuccess(!taskSuccess);
            }
            else{
                console.log(dataJson.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateTask = async (data:{id:string, title: string; description: string; deadline: string, status:string }) => {
        try {
            const response = await fetch(`https://task-backend-kb1l.onrender.com/api/v1/tasks/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: data.title,
                    description: data.description,
                    deadline: data.deadline,
                    status: data.status
                }),
            });
            const dataJson = await response.json();
            if (dataJson.success) {
               setrerender(!rerender);
            }
            else{
                console.log(dataJson.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    const deleteTask = async (data:{id:string}) => {
        try {
            const response = await fetch(`https://task-backend-kb1l.onrender.com/api/v1/tasks/${data.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const dataJson = await response.json();
            if (dataJson.success) {
               setrerender(!rerender);
            }
            else{
                console.log(dataJson.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
      setloading(true);

      const getTasks = async () => {
        try {
        const response = await fetch('https://task-backend-kb1l.onrender.com/api/v1/tasks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const dataJson = await response.json();

        if(dataJson.success){
            
            const tasks = dataJson.response.map((task: any) => ({
                id: task._id,
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
            }));
            console.log(tasks);
            setallTasks(tasks);

            const toDoTasks = tasks.filter((task: TaskType) => task.status === 'To Do');
            const inProgressTasks = tasks.filter((task: TaskType) => task.status === 'In Progress');
            const expiredTasks = tasks.filter((task: TaskType) => task.status === 'Expired');
            const completedTasks = tasks.filter((task: TaskType) => task.status === 'Completed');
    
            // Set each categorized task array in its respective state
            settoDoTask(toDoTasks);
            setinprogressTask(inProgressTasks);
            setexpireTask(expiredTasks);
            setcompletedTask(completedTasks);
            
        }
        else{
            console.log(dataJson.message);
        }
        } catch (error) {
            console.log(error);
        }

        setloading(false);
      }
      getTasks();
    }, [rerender])
    
    return (
        <TaskContext.Provider
            value={{
                alltasks,
                setallTasks,
                completedTask,
                setcompletedTask,
                toDoTask,
                settoDoTask,
                expireTask,
                setexpireTask,
                inprogressTask,
                setinprogressTask,
                openAddTask,
                setopenAddTask,
                addTask,
                loading, 
                setloading,
                taskSuccess, 
                settaskSuccess,
                updateTask,
                deleteTask
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;
