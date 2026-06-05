-- CreateTable
CREATE TABLE "page_content" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "page_key" TEXT NOT NULL,
    "content_ru" TEXT NOT NULL DEFAULT '{}',
    "content_kz" TEXT NOT NULL DEFAULT '{}',
    "content_en" TEXT NOT NULL DEFAULT '{}',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "page_content_page_key_key" ON "page_content"("page_key");
