/*
  Warnings:

  - You are about to drop the `telco_device_locations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `telco_devices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "telco_device_locations" DROP CONSTRAINT "telco_device_locations_deviceId_fkey";

-- DropTable
DROP TABLE "telco_device_locations";

-- DropTable
DROP TABLE "telco_devices";
