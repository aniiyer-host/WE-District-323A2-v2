import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function verifyMigration() {
    try {
        console.log("Verifying migration...");

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

        // Find all ProjectItems with Supabase image URLs
        const supabaseItems = await prisma.projectItem.findMany({
            where: {
                imageUrl: {
                    startsWith: 'https://fvbxrmlchqoojgdiekbq.supabase.co/storage/v1/object/public/'
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

        console.log(`Found ${supabaseItems.length} ProjectItems with Supabase image URLs`);

        // Check if any legacy items remain
        if (legacyItems.length === 0) {
            console.log("✅ All legacy image URLs have been migrated.");
        } else {
            console.log("⚠️  Some legacy image URLs remain:");
            legacyItems.forEach(item => {
                console.log(`  - ProjectItem ${item.id} (project: ${item.project.slug}): ${item.imageUrl}`);
            });
        }

        // Show a few examples of migrated items
        if (supabaseItems.length > 0) {
            console.log("\nExamples of migrated items:");
            supabaseItems.slice(0, 5).forEach(item => {
                console.log(`  - ProjectItem ${item.id} (project: ${item.project.slug}): ${item.imageUrl}`);
            });
        }

    } catch (error) {
        console.error("Verification failed:", error);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

verifyMigration();