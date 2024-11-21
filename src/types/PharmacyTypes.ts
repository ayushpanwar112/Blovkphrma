import {
  pharmacyOutletSchema,
  updatePharmacyOutletSchema,
} from "@/db/model/Pharmacy";
import { z } from "zod";

export type UpdatePharmacyOutletType = z.infer<
  typeof updatePharmacyOutletSchema
>;

export type PharmacyOutletType = z.infer<typeof pharmacyOutletSchema>;
