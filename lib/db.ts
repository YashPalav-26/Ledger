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

    console.log("Creating database pool with config:", {
      host: poolConfig.host,
      user: poolConfig.user,
      database: poolConfig.database,
      port: poolConfig.port,
      hasPassword: !!poolConfig.password,
      connectionLimit: poolConfig.connectionLimit,
      queueLimit: poolConfig.queueLimit,
      acquireTimeout: poolConfig.acquireTimeout,
      connectTimeout: poolConfig.connectTimeout,
      waitForConnections: poolConfig.waitForConnections
    })

    pool = mysql.createPool(poolConfig)

    // Log pool events in production for debugging
    if (process.env.NODE_ENV === 'production') {
      pool.on('enqueue', () => {
        console.log('Waiting for available database connection')
      })
    }
  }
  return pool
}

export async function executeQuery(query: string, params: any[] = []) {
  try {
    const connection = getDbConnection()
    const [results] = await connection.execute(query, params)
    return results
  } catch (error) {
    console.error("Database query error:", {
      query: query.substring(0, 100) + (query.length > 100 ? '...' : ''),
      error: error instanceof Error ? error.message : error,
      code: error instanceof Error && 'code' in error ? error.code : undefined,
      errno: error instanceof Error && 'errno' in error ? error.errno : undefined,
    })
    // Re-throw with more context
    if (error instanceof Error) {
      throw new Error(`Database query failed: ${error.message}`)
    }
    throw error
  }
}

export async function testDatabaseConnection() {
  try {
    console.log("Testing database connection with config:", {
      host: poolConfig.host,
      user: poolConfig.user,
      database: poolConfig.database,
      port: poolConfig.port,
      hasPassword: !!poolConfig.password,
    })

    const connection = getDbConnection()
    await connection.execute("SELECT 1 as test")
    console.log("Database connection successful")
    return true
  } catch (error) {
    console.error("Database connection test failed:", {
      error: error instanceof Error ? error.message : error,
      code: error instanceof Error && 'code' in error ? error.code : undefined,
      errno: error instanceof Error && 'errno' in error ? error.errno : undefined,
    })
    return false
  }
}
