import z from "zod";
import {
  orderItemValidationSchema,
  orderValidationSchema,
  updateOrderValidationSchema,
} from "@/db/model/Orders";

export type UpdateOrderSchemaType = z.infer<typeof updateOrderValidationSchema>;
export type OrderItemSchemaType = z.infer<typeof orderItemValidationSchema>;
export type OrderSchemaType = z.infer<typeof orderValidationSchema>;
