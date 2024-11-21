import { z } from "zod";
import AddressSchema from "@/db/model/Address";

export type AddressSchemaType = z.infer<typeof AddressSchema>;
