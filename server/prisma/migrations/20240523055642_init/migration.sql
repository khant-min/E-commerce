-- AlterTable
ALTER TABLE `admin` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `customer` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `product` ALTER COLUMN `updatedAt` DROP DEFAULT,
    MODIFY `price` VARCHAR(20) NOT NULL;
