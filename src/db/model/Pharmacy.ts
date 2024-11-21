import { z } from "zod";

export const pharmacyOutletSchema = z.object({
  pharmacyOutletId: z.bigint().optional(),
  pharmacistOwnerId: z.bigint().optional(),
  businessName: z.string().min(1, "Business name is required"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z
    .number()
    .int()
    .min(100000, "Pincode must be 6 digits")
    .max(999999, "Pincode must be 6 digits"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),
  gstin: z
    .string()
    .min(1, "GSTIN is required")
    .max(15, "GSTIN cannot exceed 15 characters"),
  email: z.string().email("Invalid email format"),
  website: z.string().url("Invalid URL format").optional(),
  userId: z.string().min(1, "User ID is required").optional(),
  isActive: z.boolean().optional(),
});

export const updatePharmacyOutletSchema = z.object({
  pharmacyOutletId: z.bigint().optional(),
  pharmacistOwnerId: z.bigint().optional(),
  businessName: z.string().min(1, "Business name is required").optional(),
  street: z.string().min(1, "Street is required").optional(),
  city: z.string().min(1, "City is required").optional(),
  state: z.string().min(1, "State is required").optional(),
  pincode: z
    .number()
    .int()
    .min(100000, "Pincode must be 6 digits")
    .max(999999, "Pincode must be 6 digits")
    .optional(),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .optional(),
  gstin: z
    .string()
    .min(1, "GSTIN is required")
    .max(15, "GSTIN cannot exceed 15 characters")
    .optional(),
  email: z.string().email("Invalid email format").optional(),
  website: z.string().url("Invalid URL format").optional(),
  userId: z.string().min(1, "User ID is required").optional(),
  isActive: z.boolean().optional(),
});

