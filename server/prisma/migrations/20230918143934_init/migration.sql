/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `shoppingcart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `admin` DROP COLUMN `isAdmin`,
    ADD COLUMN `role` ENUM('CUSTOMER', 'ADMIN') NOT NULL DEFAULT 'ADMIN';

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `isAdmin`,
    ADD COLUMN `role` ENUM('CUSTOMER', 'ADMIN') NOT NULL DEFAULT 'CUSTOMER';

-- AlterTable
ALTER TABLE `shoppingcart` DROP COLUMN `updatedAt`;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bio` VARCHAR(100) NOT NULL,
    `customerId` INTEGER NOT NULL,

    UNIQUE INDEX `Profile_customerId_key`(`customerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
