import { ApiClient } from "@notes-sync/shared";

export async function archiveCommand() {
  const client = new ApiClient("http://localhost:3000");

  try {
    const result = await client.archiveCompletedTodos();
    
    if (result.archivedCount === 0) {
      console.log("📋 No completed todos to archive");
    } else {
      console.log(`✅ Archived ${result.archivedCount} completed todo${result.archivedCount > 1 ? 's' : ''}`);
    }
  } catch (error) {
    console.error("❌ Failed to archive todos:", error as Error);
    console.log("💡 Is the service running? Try: notes-sync install");
  }
}
