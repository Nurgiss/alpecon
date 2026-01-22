-- CreateTable
CREATE TABLE "news" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "title_ru" TEXT,
    "title_kz" TEXT,
    "title_en" TEXT,
    "content" TEXT NOT NULL,
    "content_ru" TEXT,
    "content_kz" TEXT,
    "content_en" TEXT,
    "category" TEXT NOT NULL,
    "category_ru" TEXT,
    "category_kz" TEXT,
    "category_en" TEXT,
    "image" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
