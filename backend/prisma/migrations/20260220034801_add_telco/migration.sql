-- CreateTable
CREATE TABLE "telco_devices" (
    "id" UUID NOT NULL,
    "msisdn" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "supportsLocation" BOOLEAN NOT NULL DEFAULT true,
    "supportsSimSwap" BOOLEAN NOT NULL DEFAULT false,
    "supportsNumberVerify" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "telco_devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "telco_device_locations" (
    "id" UUID NOT NULL,
    "deviceId" UUID NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "accuracy" INTEGER,
    "lastSeenAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "telco_device_locations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "telco_devices_msisdn_key" ON "telco_devices"("msisdn");

-- CreateIndex
CREATE UNIQUE INDEX "telco_device_locations_deviceId_key" ON "telco_device_locations"("deviceId");

-- AddForeignKey
ALTER TABLE "telco_device_locations" ADD CONSTRAINT "telco_device_locations_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "telco_devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
