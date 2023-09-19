-- AlterTable
ALTER TABLE `admin` MODIFY `refreshToken` VARCHAR(100) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `customer` MODIFY `refreshToken` VARCHAR(100) NOT NULL DEFAULT '';
