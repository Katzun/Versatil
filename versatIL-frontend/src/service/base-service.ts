import axios, { type AxiosInstance } from "axios";

export class BaseService {
  private static axiosInstance: AxiosInstance | null = null;

  protected axios = (): AxiosInstance => {
    if (BaseService.axiosInstance == null) {
      const envUrl = (import.meta as any).env?.VITE_API_URL as string | undefined;
      const fallback = "http://localhost:30081/api"; 
      BaseService.axiosInstance = axios.create({
        baseURL: envUrl && envUrl.length > 0 ? envUrl : fallback
      });
    }
    return BaseService.axiosInstance;
  }

}
