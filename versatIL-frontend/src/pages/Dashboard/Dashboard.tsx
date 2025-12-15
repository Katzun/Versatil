import { useEffect, useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { Calendar, Check, File, LogOut, Plus, Search, Trash } from "lucide-react";
import type { CreateTaskRequest, GetTasksRequest, GetTasksResponse, TaskModel } from "../../model/task/task";
import type { User } from "../../model/user/user";
import { Cache } from "../../service/cache";
import { TaskService } from "../../service/task-service";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>();
    const [tasks, setTasks] = useState<TaskModel[]>([]);
    const [key, setKey] = useState(0)
    const [activeTab, setActiveTab] = useState("All Tasks");

    useEffect(() => {
        const getuser = async () => {
            const cache = Cache.getCache()
            const user = await cache.getItem("currentUser")
            if (user) {
                const currusr: User = JSON.parse(user)
                if (currusr) {
                    getTask(currusr)
                    setUser(currusr)
                } else {
                    navigate("/")
                }
            } else {
                console.log("user not found")
                navigate("/")
            }
        }
        getuser()
    }, [])

    const getTask = async (user: User) => {
        const taskService = new TaskService()
        if (!user) return
        const taskReq: GetTasksRequest = {
            userid: user.user_id
        }
        const tasks: GetTasksResponse = await taskService.getTasks(taskReq)
        if (tasks) {
            console.log(tasks.task)
            const taskReq: CreateTaskRequest[] = JSON.parse(tasks.task)
            const allTask: TaskModel[] = [];
            taskReq.map((e) => {
                const newTask: TaskModel = {
                    id: e.id,
                    description: e.description,
                    dueDate: e.dueDate,
                    priority: e.priority,
                    progress: e.progress,
                    status: e.status,
                    subtasks: JSON.parse(e.subtasks),
                    title: e.title
                }
                allTask.push(newTask)
            })
            setKey(key + 1)
            setTasks(allTask)
        }
    }

    const getTasksByStatus = (status: string) => {
        return tasks.filter(task => task.status === status);
    };

    const filterOptions = ["All Tasks", "In Progress", "Completed"];

    const toggleSubtask = (taskId: string, subtaskId: number) => {
        setTasks(tasks.map(task => {
            if (task.id === taskId) {
                const updatedSubtasks = task.subtasks.map(subtask => {
                    if (subtask.id === subtaskId) {
                        return { ...subtask, completed: !subtask.completed };
                    }
                    return subtask;
                });

                const completedCount = updatedSubtasks.filter(st => st.completed).length;
                const progressPercent = Math.round((completedCount / updatedSubtasks.length) * 100);

                let newStatus = progressPercent === 100 ? "Completed" : "In Progress";


                updateTask(task, taskId, subtaskId);
                return {
                    ...task,
                    subtasks: updatedSubtasks,
                    progress: progressPercent,
                    status: newStatus
                };
            }
            return task;
        }));
    };

    const updateTask = async (task: TaskModel, taskId: string, subtaskId: number) => {
        if (task.id !== taskId) {
            console.error("Task ID mismatch:", taskId);
            return;
        }

        const updatedSubtasks = task.subtasks.map(subtask => {
            if (subtask.id === subtaskId) {
                return { ...subtask, completed: !subtask.completed };
            }
            return subtask;
        });

        const completedCount = updatedSubtasks.filter(st => st.completed).length;
        const progressPercent = Math.round((completedCount / updatedSubtasks.length) * 100);

        const newStatus = progressPercent === 100 ? "Completed" : "In Progress";

        const updatedTask = {
            ...task,
            subtasks: updatedSubtasks,
            progress: progressPercent,
            status: newStatus
        };

        const request: CreateTaskRequest = {
            id: taskId,
            userid: "test",
            title: updatedTask.title,
            description: updatedTask.description,
            status: updatedTask.status,
            dueDate: updatedTask.dueDate,
            priority: updatedTask.priority,
            progress: updatedTask.progress,
            subtasks: JSON.stringify(updatedTask.subtasks)
        };

        const taskService = new TaskService();
        try {
            await taskService.updateTask(request)
        } catch (error) {
            console.log(error)
        }
    };

    const deleteTask = async (taskId: string) => {
        try {
            const taskService = new TaskService();
            await taskService.deleteTask({ taskid: taskId });
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.log(error);
        }
    };

    const priorityColors: any = {
        "High": "bg-red-500",
        "Medium": "bg-yellow-500",
        "Low": "bg-blue-500"
    };

    const filteredTasks = activeTab === "All Tasks"
        ? tasks
        : tasks.filter(task => task.status === activeTab);

    const handleLogOut = () => {
        const cache = Cache.getCache()
        cache.removeItem("currentUser")
        navigate("/")
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            <div className="bg-gray-800 px-4 sm:px-6 py-3 flex justify-between items-center border-b border-gray-700">
                <div className="flex items-center">
                    <div className="bg-purple-600 text-white rounded-full h-8 w-8 flex items-center justify-center mr-3">
                        <span className="font-bold">V</span>
                    </div>
                    <h1 className="text-xl font-bold text-white">VersatIL</h1>
                </div>

                <div className="hidden md:flex items-center space-x-6">

                    <button
                        className="bg-purple-600 hover:bg-purple-700 text-white py-1 px-3 rounded-md flex items-center cursor-pointer"
                        onClick={() => navigate("/AddTask")}
                    >
                        <Plus />
                        Add Tasks
                    </button>
                    {user && (
                        <div className="text-white">
                            {user.name}
                        </div>
                    )}

                    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-800 font-bold">
                        U
                    </div>
                    <LogOut className="text-white cursor-pointer" onClick={() => handleLogOut()} />
                </div>
            </div>

            <div className="flex-1 p-4 sm:p-6">
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-white">My Projects</h2>
                        <p className="text-gray-400 mt-1">Manage and track your active projects</p>
                    </div>
                    <div className="flex space-x-2 mt-2 sm:mt-0">
                    </div>
                </div>

                <div className="overflow-x-auto mb-6">
                    <div className="flex border-b border-gray-700 min-w-max">
                        {filterOptions.map(option => (
                            <button
                                key={option}
                                onClick={() => setActiveTab(option)}
                                className={`px-4 py-2 text-sm font-medium ${activeTab === option ? "text-white border-b-2 border-purple-500" : "text-gray-400 hover:text-white"}`}
                            >
                                {option}
                                {option !== "All Tasks" && (
                                    <span className="ml-2 bg-gray-700 text-xs px-2 py-0.5 rounded-full">
                                        {getTasksByStatus(option).length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <div className="relative w-full md:w-1/3">
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="bg-gray-800 text-gray-300 px-3 py-2 pl-10 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 w-full"
                        />
                        <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" key={key}>
                    {filteredTasks.map((task) => (
                        <div key={task.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
                            <div className="p-5 border-b border-gray-700">
                                <div className="flex justify-between items-start mb-3">
                                    <span className={`px-2 py-1 rounded-full text-xs ${priorityColors[task.priority]} text-white font-medium`}>
                                        {task.priority}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs ${task.status === "Completed" ? "bg-green-500" : "bg-yellow-500"} text-white font-medium`}>
                                        {task.status}
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg text-white mb-2">{task.title}</h3>
                                <p className="text-gray-400 text-sm">{task.description}</p>
                            </div>

                            <div className="px-5 py-3 bg-gray-750">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs text-gray-400">Progress</span>
                                    <span className="text-xs font-semibold text-white">{task.progress}%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-700 rounded-full">
                                    <div
                                        className={`h-2 rounded-full ${task.progress === 100
                                            ? "bg-green-500"
                                            : task.progress > 60
                                                ? "bg-yellow-500"
                                                : "bg-purple-500"
                                            }`}
                                        style={{ width: `${task.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="px-5 py-3">
                                <h4 className="text-sm font-medium text-white mb-2">Subtasks</h4>
                                <ul className="space-y-1 max-h-40 overflow-y-auto">
                                    {task.subtasks.map(subtask => (
                                        <li key={subtask.id} className="flex items-center">
                                            <button
                                                onClick={() => toggleSubtask(task.id, subtask.id)}
                                                className="mr-2 w-4 h-4 rounded border border-gray-500 flex items-center justify-center"
                                            >
                                                {subtask.completed && (
                                                    <Check className="h-3 w-3 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" />
                                                )}
                                            </button>
                                            <span className={`text-sm ${subtask.completed ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                                                {subtask.title}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="px-5 py-4 bg-gray-750 border-t border-gray-700 flex items-center justify-between">
                                <div className="flex items-center text-xs text-gray-400">
                                    <Calendar className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" />
                                    <span>Due: {task.dueDate}</span>
                                </div>
                                <button
                                    className="ml-2 text-gray-400 hover:text-red-500"
                                    title="Delete Task"
                                    onClick={() => deleteTask(task.id)}
                                >
                                    <Trash className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredTasks.length === 0 && (
                    <div className="text-center py-10">
                        <File className="h-16 w-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" />
                        <h3 className="text-lg font-medium text-gray-400">No tasks found</h3>
                        <p className="text-gray-500 mt-1">Try changing your filter or create a new task</p>
                        <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md" onClick={() => navigate("/AddTask")}>
                            Create New Task
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;