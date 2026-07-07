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
      WHERE table_name = 'site_content'
    `);
    console.log("site_content Columns:", columns.rows);
    
    const rows = await client.query('SELECT * FROM site_content LIMIT 1');
    console.log("site_content Row Sample:", rows.rows);
    await client.end();
  } catch (err) {
    console.error("CONNECTION ERROR:", err);
  }
}

testConnection();
