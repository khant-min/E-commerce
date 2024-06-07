/*
  Warnings:

  - You are about to drop the column `paymentMehtod` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmt` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `_customertoproduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `discounts` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingAddress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingCost` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxes` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addedDates` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expirationDate` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `length` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `material` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityInStock` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplierId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warehouseLocation` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_customertoproduct` DROP FOREIGN KEY `_CustomerToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_customertoproduct` DROP FOREIGN KEY `_CustomerToProduct_B_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `paymentMehtod`,
    DROP COLUMN `price`,
    DROP COLUMN `productId`,
    DROP COLUMN `quantity`,
    DROP COLUMN `totalAmt`,
    ADD COLUMN `discounts` DOUBLE NOT NULL,
    ADD COLUMN `paymentMethod` ENUM('KPAY', 'WAVEPAY', 'PAYPAL') NOT NULL,
    ADD COLUMN `shippingAddress` VARCHAR(100) NOT NULL,
    ADD COLUMN `shippingCost` DOUBLE NOT NULL,
    ADD COLUMN `subtotal` DOUBLE NOT NULL,
    ADD COLUMN `taxes` DOUBLE NOT NULL,
    ADD COLUMN `totalAmount` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `image`,
    DROP COLUMN `price`,
    ADD COLUMN `addedDates` DATETIME(3) NOT NULL,
    ADD COLUMN `color` VARCHAR(25) NOT NULL,
    ADD COLUMN `costPrice` VARCHAR(20) NOT NULL,
    ADD COLUMN `expirationDate` VARCHAR(15) NOT NULL,
    ADD COLUMN `height` VARCHAR(10) NOT NULL,
    ADD COLUMN `length` VARCHAR(10) NOT NULL,
    ADD COLUMN `material` VARCHAR(25) NOT NULL,
    ADD COLUMN `quantityInStock` INTEGER NOT NULL,
    ADD COLUMN `sellPrice` VARCHAR(20) NOT NULL,
    ADD COLUMN `size` VARCHAR(25) NOT NULL,
    ADD COLUMN `sku` VARCHAR(25) NOT NULL,
    ADD COLUMN `stockStatus` ENUM('INSTOCK', 'OUTOFSTOCK') NOT NULL DEFAULT 'INSTOCK',
    ADD COLUMN `supplierId` INTEGER NOT NULL,
    ADD COLUMN `warehouseLocation` VARCHAR(50) NOT NULL,
    ADD COLUMN `weight` VARCHAR(10) NOT NULL,
    ADD COLUMN `width` VARCHAR(10) NOT NULL;

-- DropTable
DROP TABLE `_customertoproduct`;

-- CreateTable
CREATE TABLE `Images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Supplier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(25) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(25) NOT NULL,

    UNIQUE INDEX `Supplier_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `unitPrice` DOUBLE NOT NULL,
    `totalPrice` DOUBLE NOT NULL,
    `orderId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Analyze` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `visitors` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Images` ADD CONSTRAINT `Images_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Supplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
