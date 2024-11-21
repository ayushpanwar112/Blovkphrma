import { z } from "zod";
import { signupSchema, loginSchema, updateUserSchema } from "@/db/model/index";

export type loginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof signupSchema>;
export type updateUserSchemaType = z.infer<typeof updateUserSchema>;
