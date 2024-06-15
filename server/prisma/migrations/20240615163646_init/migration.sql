/*
  Warnings:

  - You are about to drop the column `orderId` on the `product` table. All the data in the column will be lost.
  - Added the required column `productId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_orderId_fkey`;

-- AlterTable
ALTER TABLE `orderitem` ADD COLUMN `productId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `orderId`;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
