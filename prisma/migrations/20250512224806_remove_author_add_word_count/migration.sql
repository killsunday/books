/*
  Warnings:

  - You are about to drop the column `author` on the `Book` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Book_isbn_key` ON `Book`;

-- AlterTable
ALTER TABLE `Book` DROP COLUMN `author`,
    ADD COLUMN `expectedWordCount` INTEGER NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- RenameIndex
ALTER TABLE `Book` RENAME INDEX `Book_userId_fkey` TO `Book_userId_idx`;
