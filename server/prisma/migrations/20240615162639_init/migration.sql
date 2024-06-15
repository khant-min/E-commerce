/*
  Warnings:

  - Added the required column `orderId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `orderId` INTEGER NOT NULL,
    ALTER COLUMN `addedDates` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `OrderItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
