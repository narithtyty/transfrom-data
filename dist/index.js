"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const apiService_1 = require("./services/apiService");
const dataTransformer_1 = require("./services/dataTransformer");
async function main() {
    try {
        // Initialize services
        const apiService = new apiService_1.ApiService();
        const dataTransformer = new dataTransformer_1.DataTransformer();
        // Fetch users data
        console.log("📡 Fetching users from API...");
        const apiResponse = await apiService.fetchAllUsers();
        const transformedData = dataTransformer.transformUsersByDepartment(apiResponse.users);
        // Display results
        console.log("Transformed Data:");
        console.log(JSON.stringify(transformedData, null, 2));
    }
    catch (error) {
        console.error(" Error occurred:", error instanceof Error ? error.message : error);
        process.exit(1);
    }
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=index.js.map