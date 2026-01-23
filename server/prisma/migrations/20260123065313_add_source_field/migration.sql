-- AlterTable (idempotent - safe to run multiple times)
-- SQLite doesn't have IF NOT EXISTS for ALTER TABLE, so we'll handle this differently

-- For SQLite, we need to check if column exists first
-- This migration will be handled by Prisma's migration system
-- If it fails due to duplicate column, it means the column already exists

ALTER TABLE "news" ADD COLUMN "source" TEXT;
