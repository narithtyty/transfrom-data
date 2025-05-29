import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "../types";

export class ApiService {
    private readonly baseUrl = "https://dummyjson.com";
    private readonly timeout = 5000; 

    async fetchUsers(): Promise<ApiResponse> {
        try {
            const response: AxiosResponse<ApiResponse> = await axios.get(`${this.baseUrl}/users`, {
                timeout: this.timeout,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            return response.data;
        } catch (error) {
            throw new Error(`API request failed: ${error}`);
        }
    }

    async fetchAllUsers(): Promise<ApiResponse> {
        try {
            const initialResponse = await this.fetchUsers();
            const totalUsers = initialResponse.total;

            if (initialResponse.users.length >= totalUsers) {
                return initialResponse;
            }

            const response: AxiosResponse<ApiResponse> = await axios.get(`${this.baseUrl}/users?limit=${totalUsers}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            return response.data;
        } catch (error) {
            throw new Error(`API request failed: ${error}`);
        }
    }
}

