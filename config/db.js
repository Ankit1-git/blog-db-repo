import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.on('connect',()=>{
console.log('Connected to the PostgreSQL database successfully!');
})
pool.on('error',()=>{
    console.log("Error while connecting to the posgreSql")
    process.exit(1)
})

export default pool