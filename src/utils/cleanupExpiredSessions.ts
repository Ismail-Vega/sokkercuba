import { Context } from "../interfaces/context";

export async function cleanupExpiredSessions(context: Context) {
  const currentTime = new Date().getTime();

  try {
    const deleteResult = await context.qb
      .delete({
        tableName: "users_sessions",
        where: {
          conditions: ["expires_at < ?1"],
          params: [currentTime],
        },
      })
      .execute();

    console.log(`Deleted expired sessions:`, deleteResult);
  } catch (error) {
    console.error("Error cleaning up expired sessions:", error);
    // Handle error as needed
  }
}
