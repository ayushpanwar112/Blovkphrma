/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/db/index";
import convertBigIntToString from "../helper/convertBigIntToString";
import { VendorOrganizationSchemaType } from "@/types/types";

// Add Vendor
const addVendor = async (userId: string) => {
  try {
    const vendorExists = await prisma.vendorOwner.findUnique({
      where: {
        userId: userId,
      },
    });

    if (vendorExists) {
      return {
        status: 400,
        message: "Vendor already exists",
      };
    }

    const vendor = await prisma.vendorOwner.create({
      data: {
        userId,
      },
    });

    if (!vendor) {
      return {
        status: 400,
        message: "Error adding vendor",
      };
    }

    // Ensure BigInt is serialized correctly
    const data = vendor
      ? {
          ...vendor,
          vendorId: vendor.vendorId.toString(), // Convert BigInt to string
        }
      : null;

    return {
      status: 201,
      message: "Vendor added successfully",
      data: data,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// Get Vendor
const getVendor = async (userId: string) => {
  try {
    const vendor = await prisma.vendorOwner.findUnique({
      where: {
        userId: userId,
      },
      include: {
        VendorOrganizations: true,
      },
    });

    if (!vendor) {
      return {
        status: 400,
        message: "Vendor not found",
      };
    }

    // Ensure BigInt is serialized correctly
    const data = convertBigIntToString(vendor);

    return {
      status: 200,
      message: "Vendor found",
      data: data,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// Delete Vendor
const deleteVendor = async (userId: string) => {
  try {
    const vendorExists = await prisma.vendorOwner.findUnique({
      where: {
        userId,
      },
    });

    if (!vendorExists) {
      return {
        status: 400,
        message: "Vendor not found",
      };
    }

    const vendor = await prisma.vendorOwner.delete({
      where: {
        userId,
      },
      include: {
        VendorOrganizations: true,
      },
    });

    if (!vendor) {
      return {
        status: 400,
        message: "Error deleting vendor",
      };
    }

    return {
      status: 200,
      message: "Vendor deleted successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// get All Vendor
const getAllVendors = async () => {
  try {
    const vendors = await prisma.vendorOwner.findMany({
      include: {
        VendorOrganizations: true,
      },
    });

    if (!vendors) {
      return {
        status: 400,
        message: "No vendors found",
      };
    }

    const data = vendors.map((vendor) => convertBigIntToString(vendor));

    return {
      status: 200,
      message: "Vendors found",
      data: data,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// Add Organization
const addOrganization = async (
  userId: string,
  validatedSchema: VendorOrganizationSchemaType
) => {
  try {
    const vendorExists = await prisma.vendorOwner.findUnique({
      where: {
        userId,
      },
    });

    if (!vendorExists) {
      return {
        status: 400,
        message: "Vendor not found",
      };
    }

    const emailExists = await prisma.vendorOrganization.findUnique({
      where: {
        email: validatedSchema.email,
      },
    });

    if (emailExists) {
      return {
        status: 400,
        message: "Email already exists",
      };
    }

    const gstinExists = await prisma.vendorOrganization.findUnique({
      where: {
        gstin: validatedSchema.gstin,
      },
    });

    if (gstinExists) {
      return {
        status: 400,
        message: "GSTIN already exists",
      };
    }

    const vendorOwnerId = vendorExists.vendorId
      ? BigInt(vendorExists.vendorId)
      : undefined;

    if (!vendorOwnerId) {
      return {
        status: 400,
        message: "Vendor not found",
      };
    }

    const userID = vendorExists.userId;

    const organization = await prisma.vendorOrganization.create({
      data: {
        vendorOwnerId,
        phoneNumber: validatedSchema.phoneNumber,
        website: validatedSchema.website || "",
        userId: userID,
        businessName: validatedSchema.businessName,
        gstin: validatedSchema.gstin,
        email: validatedSchema.email,
        street: validatedSchema.street,
        city: validatedSchema.city,
        state: validatedSchema.state,
        pincode: Number(validatedSchema.pincode),
        isActive: validatedSchema.isActive ?? true,
      },
    });

    if (!organization) {
      return {
        status: 400,
        message: "Error adding organization",
      };
    }

    const data = organization
      ? {
          ...organization,
          orgId: organization.orgId.toString(),
          vendorOwnerId: organization.vendorOwnerId.toString(),
        }
      : null;

    return {
      status: 201,
      message: "Organization added successfully",
      data: data,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// Get Organization
const getOrganization = async (orgId: number) => {
  try {
    const organization = await prisma.vendorOrganization.findUnique({
      where: {
        orgId: BigInt(orgId),
      },
    });

    if (!organization) {
      return {
        status: 400,
        message: "Organization not found",
      };
    }

    const data = convertBigIntToString(organization);

    return {
      status: 200,
      message: "Organization found",
      data: data,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

// Delete Organization
const deleteOrganization = async (orgId: number) => {
  try {
    const organization = await prisma.vendorOrganization.delete({
      where: {
        orgId: BigInt(orgId),
      },
    });

    if (!organization) {
      return {
        status: 400,
        message: "Organization not found",
      };
    }

    return {
      status: 200,
      message: "Organization deleted successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: "Organization not found",
    };
  }
};

const getAllOrganizations = async () => {
  try {
    const organizations = await prisma.vendorOrganization.findMany();

    if (!organizations) {
      return {
        status: 400,
        message: "Organizations not found",
      };
    }

    const data = organizations.map((organization) =>
      convertBigIntToString(organization)
    );

    return {
      status: 200,
      message: "Organizations found",
      data: data,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error fetching organizations",
    };
  }
};

export {
  addVendor,
  deleteVendor,
  getVendor,
  addOrganization,
  getOrganization,
  deleteOrganization,
  getAllOrganizations,
  getAllVendors,
};
