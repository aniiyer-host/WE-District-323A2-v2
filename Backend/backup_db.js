import pg from 'pg';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pg;

async function backup() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    await client.connect();
    console.log("Connected to database for backup...");
    
    const clubsRes = await client.query('SELECT * FROM clubs');
    const projectsRes = await client.query('SELECT * FROM projects');
    const pagesRes = await client.query('SELECT * FROM project_pages');
    
    const backupData = {
      clubs: clubsRes.rows,
      projects: projectsRes.rows,
      project_pages: pagesRes.rows
    };
    
    fs.writeFileSync('db_backup.json', JSON.stringify(backupData, null, 2));
    console.log(`Backup saved to db_backup.json. Backup stats:`);
    console.log(`- Clubs: ${backupData.clubs.length}`);
    console.log(`- Projects: ${backupData.projects.length}`);
    console.log(`- Project Pages: ${backupData.project_pages.length}`);
    
    await client.end();
  } catch (err) {
    console.error("Backup failed:", err);
  }
}

backup();
