// Migration script to move legacy project images to Supabase Storage
// Run with: node migrate_project_images.js

import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();
import supabase from './utils/supabaseClient.js';

const getStorageBucket = () => process.env.SUPABASE_STORAGE_BUCKET || 'we-district-storage';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function migrateLegacyProjectImages() {
    try {
        console.log("Starting legacy project image migration to Supabase Storage...");

        // Find all ProjectItems with legacy image URLs
        const legacyItems = await prisma.projectItem.findMany({
            where: {
                imageUrl: {
                    startsWith: '/images/projects-page-imgs/'
                }
            },
            include: {
                project: {
                    select: {
                        id: true,
                        slug: true,
                        title: true
                    }
                }
            }
        });

        console.log(`Found ${legacyItems.length} ProjectItems with legacy image URLs`);

        // Group by source file to avoid duplicate uploads
        const fileMap = new Map();
        legacyItems.forEach(item => {
            // Convert URL like "/images/projects-page-imgs/health/1.jpg"
            // to file path like "src/images/projects-page-imgs/health/1.jpg"
            const relativePath = item.imageUrl.substring(1); // Remove leading '/'
            const sourcePath = path.join(__dirname, '..', 'Women_Epitome', 'src', relativePath);

            if (!fileMap.has(sourcePath)) {
                fileMap.set(sourcePath, {
                    items: [],
                    sourcePath: sourcePath
                });
            }
            fileMap.get(sourcePath).items.push(item);
        });

        console.log(`Unique legacy image files to process: ${fileMap.size}`);

        // Process each unique image file
        for (const [sourcePath, data] of fileMap.entries()) {
            const items = data.items;
            const firstItem = items[0];

            try {
                console.log(`Processing: ${path.basename(sourcePath)}`);

                // Check if file exists
                if (!fs.existsSync(sourcePath)) {
                    console.warn(`Source file not found: ${sourcePath}`);
                    continue;
                }

                // Read the image file
                const fileBuffer = fs.readFileSync(sourcePath);

                // Determine the category from the legacy path
                // Example: /images/projects-page-imgs/health/1.jpg -> health
                const pathParts = firstItem.imageUrl.split('/');
                const categoryIndex = pathParts.indexOf('projects-page-imgs');
                const category = pathParts[categoryIndex + 1]; // e.g., "health"

                // Determine file type
                const ext = path.extname(sourcePath).substring(1).toLowerCase();
                const mimeType = {
                    'jpg': 'image/jpeg',
                    'jpeg': 'image/jpeg',
                    'png': 'image/png',
                    'gif': 'image/gif',
                    'webp': 'image/webp'
                }[ext] || 'application/octet-stream';

                // Get the relative path from the source path for Supabase storage
                // Source path: .../Women_Epitome/src/images/projects-page-imgs/health/1.jpg
                // We want: health/1.jpg for the Supabase path
                const relativePath = path.relative(
                    path.join(__dirname, '..', 'Women_Epitome', 'src', 'images', 'projects-page-imgs'),
                    sourcePath
                );

                // Upload to Supabase Storage using the Node.js client
                const bucket = getStorageBucket();
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from(bucket)
                    .upload(`projects/${relativePath}`, fileBuffer, {
                        contentType: mimeType,
                        upsert: true
                    });

                if (uploadError) {
                    console.warn(`Failed to upload ${relativePath} to Supabase: ${uploadError.message}`);
                    // Keep the original legacy path if upload fails
                    continue;
                }

                // Get the public URL for the uploaded file
                const { data: publicUrlData } = supabase.storage
                    .from(bucket)
                    .getPublicUrl(`projects/${relativePath}`);

                const imageUrl = publicUrlData.publicUrl;
                console.log(`Uploaded ${relativePath} to Supabase: ${imageUrl}`);

                // Update all ProjectItems that reference this legacy image
                const updatePromises = items.map(item =>
                    prisma.projectItem.update({
                        where: { id: item.id },
                        data: { imageUrl: imageUrl }
                    })
                );

                await Promise.all(updatePromises);
                console.log(`✅ Migrated ${items.length} ProjectItems to: ${imageUrl}`);

            } catch (error) {
                console.error(`❌ Error processing ${sourcePath}:`, error.message);
            }
        }

        console.log("Migration completed successfully!");

    } catch (error) {
        console.error("Migration failed:", error);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

// Run the migration
migrateLegacyProjectImages();