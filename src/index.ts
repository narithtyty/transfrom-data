import { ApiService } from "./services/apiService";
import { DataTransformer } from "./services/dataTransformer";

async function main(): Promise<void> {
  try {
    // Initialize services
    const apiService = new ApiService();
    const dataTransformer = new DataTransformer();

    // Fetch users data
    console.log("📡 Fetching users from API...");
    const apiResponse = await apiService.fetchAllUsers();
    const transformedData = dataTransformer.transformUsersByDepartment(apiResponse.users);

    // Display results
    console.log("Transformed Data:");
    console.log(JSON.stringify(transformedData, null, 2));
  } catch (error) {
    console.error(" Error occurred:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
if (require.main === module) {
  main();
}

export { main };
