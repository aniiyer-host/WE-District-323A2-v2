import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function fixRemainingLegacy() {
    try {
        console.log("Fixing remaining legacy image URLs...");

        // Find all ProjectItems with legacy image URLs
        const legacyItems = await prisma.projectItem.findMany({
            where: {
                imageUrl: {
                    startsWith: '/images/projects-page-imgs/'
                }
            },
            select: {
                id: true,
                imageUrl: true,
                project: {
                    select: {
                        slug: true
                    }
                }
            }
        });

        console.log(`Found ${legacyItems.length} ProjectItems with legacy image URLs`);

        let fixedCount = 0;
        for (const item of legacyItems) {
            // Convert URL like "/images/projects-page-imgs/health/1.jpg"
            // to file path like "src/images/projects-page-imgs/health/1.jpg"
            const relativePath = item.imageUrl.substring(1); // Remove leading '/'
            const sourcePath = path.join(process.cwd(), '..', 'Women_Epitome', 'src', relativePath);

            // Check if file exists
            if (!fs.existsSync(sourcePath)) {
                console.log(`Setting imageUrl to null for ProjectItem ${item.id} (project: ${item.project.slug}) because source file not found: ${sourcePath}`);
                await prisma.projectItem.update({
                    where: { id: item.id },
                    data: { imageUrl: null }
                });
                fixedCount++;
            } else {
                console.log(`File exists for ProjectItem ${item.id}: ${sourcePath}`);
            }
        }

        console.log(`Fixed ${fixedCount} ProjectItems by setting imageUrl to null.`);

    } catch (error) {
        console.error("Fix failed:", error);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

fixRemainingLegacy();