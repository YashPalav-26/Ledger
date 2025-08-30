import mysql from "mysql2/promise"

const connectionConfig = {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "notes_manager",
  port: parseInt(process.env.DB_PORT || "3306"),
  connectTimeout: 60000,
}

const poolConfig = {
  ...connectionConfig,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  acquireTimeout: 30000, // 30 seconds
}

let pool: mysql.Pool | null = null

export function getDbConnection() {
  if (!pool) {
    // Validate environment variables
    if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
      throw new Error("Missing required database environment variables")
    }

    pool = mysql.createPool(poolConfig)
  }
  return pool
}

export async function executeQuery(query: string, params: any[] = []) {
  try {
    const connection = getDbConnection()
    const [results] = await connection.execute(query, params)
    return results
  } catch (error) {
    // Re-throw with more context
    if (error instanceof Error) {
      throw new Error(`Database query failed: ${error.message}`)
    }
    throw error
  }
}

export async function testDatabaseConnection() {
  try {
    const connection = getDbConnection()
    await connection.execute("SELECT 1 as test")
    return true
  } catch (error) {
    return false
  }
}
