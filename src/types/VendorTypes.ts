import { VendorOrganizationSchema, VendorOwnerSchema } from "@/db/model/Vendor";
import { z } from "zod";

export type VendorSchemaType = z.infer<typeof VendorOwnerSchema>;
export type VendorOrganizationSchemaType = z.infer<
  typeof VendorOrganizationSchema
>;
