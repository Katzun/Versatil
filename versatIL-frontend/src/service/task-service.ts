import type { AxiosResponse } from "axios";
import type {
  CreateTaskRequest,
  CreateTaskResponse,
  DeleteTaskRequest,
  GetTasksRequest,
  GetTasksResponse,
} from "../model/task/task";
import { BaseService } from "./base-service";

export class TaskService extends BaseService {
  public createTask = async (request: CreateTaskRequest) => {
    console.log("create task request ", request);
    console.log("Full URL:", "/CreateTask");
    const response: AxiosResponse<CreateTaskResponse> = await this.axios().post(
      "/CreateTask",
      JSON.stringify(request)
    );
    return response.data;
  };

  public getTasks = async (request: GetTasksRequest) => {
    console.log("get task request ", request);
    console.log("Full URL:", "/GetTask");
    const response: AxiosResponse<GetTasksResponse> = await this.axios().get(
      "/GetTask",
      { params: request }
    );
    console.log("get task ", response.data);
    return response.data;
  };

  public updateTask = async (request: CreateTaskRequest) => {
    console.log("update task request ", request);
    console.log("Full URL:", "/UpdateTask");
    const response: AxiosResponse<CreateTaskResponse> = await this.axios().post(
      "/UpdateTask",
      JSON.stringify(request)
    );
    return response.data;
  };

  public deleteTask = async (request: DeleteTaskRequest) => {
    console.log("delete task request ", request);
    console.log("Full URL:", "/DeleteTask");
    const response: AxiosResponse<CreateTaskResponse> = await this.axios().post(
      "/DeleteTask",
      JSON.stringify(request)
    );
    return response.data;
  };
}
