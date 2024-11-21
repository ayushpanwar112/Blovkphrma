import { NextRequest } from "next/server";
import sendResponse from "@/utils/responseHelper";
import { signupSchema } from "@/db/model";
import * as userServices from "@/services/userServices";
import { RegisterSchemaType } from "@/types/userTypes";
import asyncHandler from "@/middlewares/asyncHandler";

export const POST = asyncHandler(async (req: NextRequest) => {
  // Parse the request body
  const body = await req.json();

  // Validate the request body using signupSchema
  const parseResult = signupSchema.safeParse(body);

  if (!parseResult.success) {
    return sendResponse(400, {
      error: parseResult.error.issues[0].message,
    });
  }

  // Extract validated data
  const validatedData: RegisterSchemaType = parseResult.data;

  // Call the user registration service
  const result = await userServices.userRegisterService(validatedData);
  if (result.status >= 200 && result.status < 300) {
    return sendResponse(result.status, {
      message: result.message,
    });
  } else {
    return sendResponse(result.status, {
      message: result.message,
    });
  }
});
