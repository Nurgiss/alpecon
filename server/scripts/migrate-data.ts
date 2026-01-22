import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

interface OldNewsItem {
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  title_ru?: string;
  title_kz?: string;
  title_en?: string;
  content_ru?: string;
  content_kz?: string;
  content_en?: string;
  category_ru?: string;
  category_kz?: string;
  category_en?: string;
}

async function migrateData() {
  try {
    console.log('🚀 Starting data migration from news.json to SQLite database...\n');

    // Read existing news.json
    const newsFilePath = path.join(__dirname, '..', 'data', 'news.json');
    const fileContent = await fs.readFile(newsFilePath, 'utf-8');
    const oldNews: OldNewsItem[] = JSON.parse(fileContent);

    console.log(`📄 Found ${oldNews.length} news items in news.json`);

    // Check if database already has data
    const existingCount = await prisma.news.count();
    if (existingCount > 0) {
      console.log(`⚠️  Database already contains ${existingCount} news items.`);
      console.log('Do you want to proceed? This will skip duplicate IDs.\n');
    }

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    // Migrate each news item
    for (const item of oldNews) {
      try {
        // Check if news with this ID already exists
        const existing = await prisma.news.findUnique({
          where: { id: item.id }
        });

        if (existing) {
          console.log(`⏭️  Skipping ID ${item.id} (already exists)`);
          skipCount++;
          continue;
        }

        // Create news item in database
        await prisma.news.create({
          data: {
            id: item.id,
            title: item.title,
            content: item.content,
            category: item.category,
            image: item.image,
            author: item.author,
            date: new Date(item.date),
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt),
            titleRu: item.title_ru || null,
            titleKz: item.title_kz || null,
            titleEn: item.title_en || null,
            contentRu: item.content_ru || null,
            contentKz: item.content_kz || null,
            contentEn: item.content_en || null,
            categoryRu: item.category_ru || null,
            categoryKz: item.category_kz || null,
            categoryEn: item.category_en || null,
          }
        });

        console.log(`✅ Migrated: ${item.title.substring(0, 50)}...`);
        successCount++;
      } catch (error) {
        console.error(`❌ Error migrating item ${item.id}:`, error);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`   ✅ Successfully migrated: ${successCount}`);
    console.log(`   ⏭️  Skipped (duplicates): ${skipCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`   📝 Total in file: ${oldNews.length}`);

    // Verify final count
    const finalCount = await prisma.news.count();
    console.log(`\n✨ Database now contains ${finalCount} news items total.\n`);

  } catch (error) {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run migration
migrateData()
  .then(() => {
    console.log('🎉 Migration completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  });
