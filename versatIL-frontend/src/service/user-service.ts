import type { AxiosResponse } from "axios";
import { BaseService } from "./base-service";
import type {
  CreateUserRequest,
  CreateUserResponse,
  LoginUserRequest,
  LoginUserResponse,
} from "../model/user/user";

export class UserService extends BaseService {
  public createUser = async (request: CreateUserRequest) => {
    console.log("user request ", request);
    console.log("Full URL:",  "/CreateUser");
    const response: AxiosResponse<CreateUserResponse> = await this.axios().post(
       "/CreateUser",
      JSON.stringify(request)
    );
    return response.data;
  };

  public Login = async (request: LoginUserRequest) => {
    console.log("user login request ", request);
    console.log("Full URL:", "/Login");
    const response: AxiosResponse<LoginUserResponse> = await this.axios().post(
      "/Login",
      JSON.stringify(request)
    );
    console.log("user login ",response.data)
    return response.data;
  };
}
