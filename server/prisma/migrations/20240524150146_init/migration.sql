/*
  Warnings:

  - A unique constraint covering the columns `[category]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Product_category_key` ON `Product`(`category`);
