"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const axios_1 = __importDefault(require("axios"));
class ApiService {
    constructor() {
        this.baseUrl = "https://dummyjson.com";
        this.timeout = 5000;
    }
    async fetchUsers() {
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/users`, {
                timeout: this.timeout,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error}`);
        }
    }
    async fetchAllUsers() {
        try {
            const initialResponse = await this.fetchUsers();
            const totalUsers = initialResponse.total;
            if (initialResponse.users.length >= totalUsers) {
                return initialResponse;
            }
            const response = await axios_1.default.get(`${this.baseUrl}/users?limit=${totalUsers}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error}`);
        }
    }
}
exports.ApiService = ApiService;
//# sourceMappingURL=apiService.js.map