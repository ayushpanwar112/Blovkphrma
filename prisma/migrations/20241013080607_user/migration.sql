-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'SUPPLIER', 'PHARMACY');

-- CreateEnum
CREATE TYPE "orderStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "paymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "paymentMethod" AS ENUM ('CASH_ON_DELIVERY', 'UPI', 'CARD', 'NET_BANKING', 'CRYPTO');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "phoneNumber" TEXT NOT NULL,
    "profilePic" TEXT,
    "oAuthId" TEXT,
    "provider" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorOwner" (
    "vendorId" BIGSERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VendorOwner_pkey" PRIMARY KEY ("vendorId")
);

-- CreateTable
CREATE TABLE "VendorOrganization" (
    "orgId" BIGSERIAL NOT NULL,
    "vendorOwnerId" BIGINT NOT NULL,
    "businessName" TEXT NOT NULL,
    "gstin" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "phoneNumber" TEXT NOT NULL,
    "website" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VendorOrganization_pkey" PRIMARY KEY ("orgId")
);

-- CreateTable
CREATE TABLE "Pharmacist" (
    "pharmacistId" BIGSERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pharmacist_pkey" PRIMARY KEY ("pharmacistId")
);

-- CreateTable
CREATE TABLE "PharmacyOutlet" (
    "pharmacyOutletId" BIGSERIAL NOT NULL,
    "pharmacistOwnerId" BIGINT NOT NULL,
    "businessName" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" INTEGER NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "gstin" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "userId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PharmacyOutlet_pkey" PRIMARY KEY ("pharmacyOutletId")
);

-- CreateTable
CREATE TABLE "Orders" (
    "orderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pharmacyOutletId" BIGINT NOT NULL,
    "orgId" BIGINT NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL,
    "orderStatus" "orderStatus" NOT NULL DEFAULT 'PENDING',
    "paymentStatus" "paymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" "paymentMethod" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "OrderItems" (
    "orderItemId" BIGSERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" BIGINT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderItems_pkey" PRIMARY KEY ("orderItemId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Address_userId_key" ON "Address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VendorOwner_userId_key" ON "VendorOwner"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VendorOrganization_gstin_key" ON "VendorOrganization"("gstin");

-- CreateIndex
CREATE UNIQUE INDEX "VendorOrganization_email_key" ON "VendorOrganization"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pharmacist_userId_key" ON "Pharmacist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PharmacyOutlet_gstin_key" ON "PharmacyOutlet"("gstin");

-- CreateIndex
CREATE UNIQUE INDEX "PharmacyOutlet_email_key" ON "PharmacyOutlet"("email");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorOwner" ADD CONSTRAINT "VendorOwner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorOrganization" ADD CONSTRAINT "VendorOrganization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorOrganization" ADD CONSTRAINT "VendorOrganization_vendorOwnerId_fkey" FOREIGN KEY ("vendorOwnerId") REFERENCES "VendorOwner"("vendorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pharmacist" ADD CONSTRAINT "Pharmacist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyOutlet" ADD CONSTRAINT "PharmacyOutlet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyOutlet" ADD CONSTRAINT "PharmacyOutlet_pharmacistOwnerId_fkey" FOREIGN KEY ("pharmacistOwnerId") REFERENCES "Pharmacist"("pharmacistId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_pharmacyOutletId_fkey" FOREIGN KEY ("pharmacyOutletId") REFERENCES "PharmacyOutlet"("pharmacyOutletId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "VendorOrganization"("orgId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;
