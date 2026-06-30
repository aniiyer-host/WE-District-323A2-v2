import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pg;

async function testConnection() {
  console.log("Testing with DATABASE_URL:", process.env.DATABASE_URL);
  console.log("Testing with DIRECT_URL:", process.env.DIRECT_URL);
  
  const client = new Client({
    connectionString: process.env.DIRECT_URL,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    await client.connect();
    console.log("SUCCESSFULLY CONNECTED!");
    const columns = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'project_pages'
    `);
    console.log("project_pages Columns:", columns.rows);
    
    const rows = await client.query('SELECT * FROM project_pages LIMIT 1');
    console.log("project_pages Row Sample:", rows.rows);
    await client.end();
  } catch (err) {
    console.error("CONNECTION ERROR:", err);
  }
}

testConnection();
