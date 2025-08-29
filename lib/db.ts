import mysql from "mysql2/promise"

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "notes_manager",
  port: parseInt(process.env.DB_PORT || "3306"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000,
  acquireTimeout: 60000,
  timeout: 60000,
}

let pool: mysql.Pool | null = null

export function getDbConnection() {
  if (!pool) {
    // Validate environment variables
    if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
      throw new Error("Missing required database environment variables")
    }
    pool = mysql.createPool(dbConfig)
  }
  return pool
}

export async function executeQuery(query: string, params: any[] = []) {
  try {
    const connection = getDbConnection()
    const [results] = await connection.execute(query, params)
    return results
  } catch (error) {
    console.error("Database query error:", error)
    // Re-throw with more context
    if (error instanceof Error) {
      throw new Error(`Database query failed: ${error.message}`)
    }
    throw error
  }
}
