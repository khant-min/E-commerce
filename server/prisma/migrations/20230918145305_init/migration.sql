/*
  Warnings:

  - Added the required column `refreshToken` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin` ADD COLUMN `refreshToken` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `customer` ADD COLUMN `refreshToken` VARCHAR(100) NOT NULL;
