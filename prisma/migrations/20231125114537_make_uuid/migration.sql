/*
  Warnings:

  - The primary key for the `MarkdownFile` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MarkdownFile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdById" TEXT NOT NULL,
    "content" TEXT,
    "deleteBy" DATETIME,
    "deleteOnSeen" BOOLEAN NOT NULL DEFAULT false,
    "archived" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "MarkdownFile_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MarkdownFile" ("content", "createdAt", "createdById", "deleteBy", "deleteOnSeen", "id", "name", "updatedAt") SELECT "content", "createdAt", "createdById", "deleteBy", "deleteOnSeen", "id", "name", "updatedAt" FROM "MarkdownFile";
DROP TABLE "MarkdownFile";
ALTER TABLE "new_MarkdownFile" RENAME TO "MarkdownFile";
CREATE INDEX "MarkdownFile_name_idx" ON "MarkdownFile"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
