-- CreateTable
CREATE TABLE "camara_requests" (
    "correlator" UUID NOT NULL,
    "api_name" TEXT NOT NULL,
    "phone_number" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "http_status" INTEGER,
    "error_code" TEXT,
    "error_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "camara_requests_pkey" PRIMARY KEY ("correlator")
);

-- CreateTable
CREATE TABLE "location_verification_requests" (
    "correlator" UUID NOT NULL,
    "area_type" TEXT NOT NULL,
    "center_latitude" DOUBLE PRECISION NOT NULL,
    "center_longitude" DOUBLE PRECISION NOT NULL,
    "radius" INTEGER NOT NULL,
    "max_age" INTEGER,

    CONSTRAINT "location_verification_requests_pkey" PRIMARY KEY ("correlator")
);

-- CreateTable
CREATE TABLE "location_verification_responses" (
    "correlator" UUID NOT NULL,
    "verification_result" TEXT NOT NULL,
    "match_rate" INTEGER,
    "last_location_time" TIMESTAMP(3),
    "http_status" INTEGER,
    "error_code" TEXT,
    "error_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "location_verification_responses_pkey" PRIMARY KEY ("correlator")
);

-- AddForeignKey
ALTER TABLE "location_verification_requests" ADD CONSTRAINT "location_verification_requests_correlator_fkey" FOREIGN KEY ("correlator") REFERENCES "camara_requests"("correlator") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location_verification_responses" ADD CONSTRAINT "location_verification_responses_correlator_fkey" FOREIGN KEY ("correlator") REFERENCES "camara_requests"("correlator") ON DELETE RESTRICT ON UPDATE CASCADE;
