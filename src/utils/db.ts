import mysql from 'mysql2'

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    console.error("DATABASE_URL environment variable is not set.")
    process.exit(1)
}

export default mysql.createConnection(databaseUrl)