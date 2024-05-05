/*
  Warnings:

  - Added the required column `lastModified` to the `canvases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastModified` to the `folders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "canvases" ADD COLUMN     "lastModified" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "folders" ADD COLUMN     "lastModified" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
