import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Map old project link filenames to the correct clean frontend slugs (categoryKey)
const linkToSlugMap = {
  '/projects/AnaajDaan.html': 'anaajdaan',
  '/projects/ChildWelfare.html': 'child-welfare',
  '/projects/SeniorCitizen.html': 'senior-citizen',
  '/projects/Health.html': 'health',
  '/projects/WomenWelfare.html': 'women-welfare',
  '/projects/Needy.html': 'needy',
  '/projects/ImageBuilding.html': 'image-building',
  '/projects/Education.html': 'education',
  '/projects/AnimalWelfare.html': 'animal-welfare',
  '/projects/PermanentProjects.html': 'permanent-projects',
  '/projects/RuralDevelopment.html': 'rural-development',
  '/projects/SpeciallyAbled.html': 'specially-abled'
};

async function restore() {
  try {
    const backup = JSON.parse(fs.readFileSync('db_backup.json', 'utf8'));
    console.log("Read backup file successfully...");

    // Clean existing tables to avoid duplicate key errors during restore
    console.log("Cleaning database tables...");
    await prisma.event.deleteMany({});
    await prisma.projectItem.deleteMany({});
    await prisma.project.deleteMany({});
    await prisma.club.deleteMany({});
    await prisma.siteContent.deleteMany({});

    console.log("Restoring Clubs and Events...");
    for (const oldClub of backup.clubs) {
      // 1. Create Club
      const createdClub = await prisma.club.create({
        data: {
          id: oldClub.id,
          clubId: oldClub.club_id,
          name: oldClub.name,
          description: oldClub.description,
          president: oldClub.president || null,
          legacyEvents: Array.isArray(oldClub.events) ? oldClub.events : [],
          images: Array.isArray(oldClub.images) ? oldClub.images : [],
          coverImage: oldClub.cover_image,
          logo: oldClub.logo,
          established: oldClub.established ? new Date(oldClub.established) : null,
          isActive: oldClub.is_active ?? true,
          createdAt: new Date(oldClub.created_at),
          updatedAt: new Date(oldClub.updated_at)
        }
      });

      // 2. Extract and create events relation if any
      const events = Array.isArray(oldClub.events) ? oldClub.events : [];
      for (const oldEv of events) {
        await prisma.event.create({
          data: {
            id: oldEv.id || undefined, // use existing ID if exists, otherwise generate
            clubId: oldClub.club_id,
            title: oldEv.title,
            description: oldEv.description,
            date: oldEv.date ? new Date(oldEv.date) : null,
            location: oldEv.location,
            category: oldEv.category,
            coverImage: oldEv.coverImage || oldEv.cover_image || null,
            images: Array.isArray(oldEv.images) ? oldEv.images : [],
            isFeatured: oldEv.isFeatured || oldEv.is_featured || false,
            createdAt: oldEv.createdAt ? new Date(oldEv.createdAt) : new Date(),
            updatedAt: oldEv.updatedAt ? new Date(oldEv.updatedAt) : new Date()
          }
        });
      }
    }
    console.log("Clubs and Events restored.");

    console.log("Restoring Projects and Project Items...");
    for (const oldProj of backup.projects) {
      const slug = linkToSlugMap[oldProj.link];
      if (!slug) {
        console.warn(`Could not find slug mapping for link: ${oldProj.link}`);
        continue;
      }

      // 1. Create Project
      const createdProj = await prisma.project.create({
        data: {
          id: oldProj.id,
          slug: slug,
          title: oldProj.title,
          subtitle: oldProj.description, // map description to subtitle temporarily
          isActive: true,
          sortOrder: 0
        }
      });

      // 2. Find matching project page to extract items
      const matchingPage = backup.project_pages.find(p => p.page_type === slug);
      if (matchingPage && Array.isArray(matchingPage.data)) {
        let order = 0;
        for (const item of matchingPage.data) {
          await prisma.projectItem.create({
            data: {
              projectId: createdProj.id,
              description: item.description || null,
              imageUrl: item.imageUrl || item.image || null,
              clubId: item.clubId || item.club_id || null,
              sortOrder: order++
            }
          });
        }
      }
    }
    console.log("Projects and Project Items restored.");

    // Migrate old project_pages that were CMS blocks to the new site_content table
    console.log("Migrating static pages content from project_pages to site_content...");
    // Let's check if there are other entries in project_pages that are not project categories
    // For example, about_mission, etc.
    const restoredSlugs = Object.values(linkToSlugMap);
    const nonProjPages = backup.project_pages.filter(p => !restoredSlugs.includes(p.page_type));
    for (const page of nonProjPages) {
      await prisma.siteContent.create({
        data: {
          key: page.page_type,
          value: page.data
        }
      });
      console.log(`Migrated page_type '${page.page_type}' to site_content key.`);
    }

    console.log("DATABASE RESTORE COMPLETED SUCCESSFULLY!");
    await pool.end();
  } catch (err) {
    console.error("Restore failed:", err);
    process.exit(1);
  }
}

restore();
