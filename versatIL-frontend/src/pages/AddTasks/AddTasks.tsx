import { useEffect, useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { Calendar, ChevronLeft, List, Plus, Tag } from "lucide-react";
import type { CreateTaskRequest, SubtaskDetail } from "../../model/task/task";
import { TaskService } from "../../service/task-service";
import type { User } from "../../model/user/user";
import { Cache } from "../../service/cache";

const AddTasks = () => {
    const navigate = useNavigate();
    const [currUser, setUser] = useState<User>();
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [subtasks, setSubtasks] = useState<SubtaskDetail[]>([
        { id: 1, title: "", completed: false }
    ]);

    useEffect(() => {
        const getuser = async () => {
            const cache = Cache.getCache()
            const user = await cache.getItem("currentUser")
            if (user) {
                const currusr: User = JSON.parse(user)
                setUser(currusr)
                console.log("Current User ", currusr)
            } else {
                navigate("/")
            }
        }

        getuser()
    }, [])
    
    const today = new Date().toISOString().split('T')[0];

    const addSubtask = () => {
        const newId = subtasks.length > 0 ? Math.max(...subtasks.map(st => st.id)) + 1 : 1;
        setSubtasks([...subtasks, { id: newId, title: "", completed: false }]);
    };

    const updateSubtask = (id: number, title: string) => {
        setSubtasks(subtasks.map(st => st.id === id ? { ...st, title } : st));
    };

    const removeSubtask = (id: number) => {
        setSubtasks(subtasks.filter(st => st.id !== id));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!currUser) return
        const newTask: CreateTaskRequest = {
            id: "",
            userid: currUser.user_id,
            title: taskTitle,
            description: taskDescription,
            status: "In Progress",
            dueDate: dueDate || "No due date",
            priority: priority,
            progress: 0,
            subtasks: JSON.stringify(subtasks.filter(st => st.title.trim() !== ""),)
        };

        console.log("New task created:", newTask);
        const taskService = new TaskService()
        await taskService.createTask(newTask);
        navigate("/Dashboard");
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            <div className="bg-gray-800 px-4 sm:px-6 py-3 flex justify-between items-center border-b border-gray-700">
                <div className="flex items-center">
                    <div className="bg-purple-600 text-white rounded-full h-8 w-8 flex items-center justify-center mr-3">
                        <span className="font-bold">V</span>
                    </div>
                    <h1 className="text-xl font-bold text-white">VersatIL</h1>
                </div>

                <div className="hidden md:flex items-center space-x-6 ">
                    <div className="user flex gap-5 justify-center items-center h-8">
                        <label className="text-white">{currUser?.name}</label>
                        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-800 font-bold">
                            U
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-4 sm:p-6">
                <div className="max-w-3xl mx-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-gray-400 hover:text-white mb-6"
                    >
                        <ChevronLeft className="h-5 w-5 mr-1" />
                        <span>Back to Dashboard</span>
                    </button>

                    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-700">
                            <h2 className="text-2xl font-bold text-white mb-2">Create New Task</h2>
                            <p className="text-gray-400">Fill in the details below to create a new task</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                                        Task Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={taskTitle}
                                        onChange={(e) => setTaskTitle(e.target.value)}
                                        placeholder="Enter task title"
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        value={taskDescription}
                                        onChange={(e) => setTaskDescription(e.target.value)}
                                        placeholder="Enter task description"
                                        rows={4}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="dueDate" className="text-sm font-medium text-gray-300 mb-1 flex items-center">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            Due Date
                                        </label>
                                        <input
                                            type="date"
                                            id="dueDate"
                                            value={dueDate}
                                            min={today}
                                            onChange={(e) => setDueDate(e.target.value)}
                                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="priority" className="text-sm font-medium text-gray-300 mb-1 flex items-center">
                                            <Tag className="h-4 w-4 mr-1" />
                                            Priority
                                        </label>
                                        <select
                                            id="priority"
                                            value={priority}
                                            onChange={(e) => setPriority(e.target.value)}
                                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        >
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                                        <List className="h-4 w-4 mr-1" />
                                        Subtasks
                                    </label>
                                    <div className="space-y-3">
                                        {subtasks.map((subtask) => (
                                            <div key={subtask.id} className="flex items-center">
                                                <input
                                                    type="text"
                                                    value={subtask.title}
                                                    onChange={(e) => updateSubtask(subtask.id, e.target.value)}
                                                    placeholder="Enter subtask"
                                                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeSubtask(subtask.id)}
                                                    className="ml-2 text-gray-400 hover:text-white"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addSubtask}
                                        className="mt-3 flex items-center text-sm text-purple-400 hover:text-purple-300"
                                    >
                                        <Plus className="h-4 w-4 mr-1" />
                                        Add Subtask
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    Create Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTasks;