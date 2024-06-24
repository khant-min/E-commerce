/*
  Warnings:

  - You are about to alter the column `costPrice` on the `product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Double`.
  - You are about to alter the column `sellPrice` on the `product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Double`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `costPrice` DOUBLE NOT NULL,
    MODIFY `sellPrice` DOUBLE NOT NULL;
