export interface TaskModel {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  priority: string;
  progress: number;
  subtasks: SubtaskDetail[];
}

export interface SubtaskDetail {
  id: number;
  title: string;
  completed: boolean;
}

export interface CreateTaskRequest {
  id: string;
  userid: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  priority: string;
  progress: number;
  subtasks: string;
}

export interface CreateTaskResponse{
  message: string;
}

export interface GetTasksRequest{
  userid: string;
}

export interface GetTasksResponse{
  messsage: string;
  task: string;
}

export interface DeleteTaskRequest{
  taskid: string;
}
