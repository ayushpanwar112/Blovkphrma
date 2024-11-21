/* eslint-disable @typescript-eslint/no-unused-vars */
import { loginSchema } from "@/db/model";
import { loginSchemaType } from "@/types/userTypes";
import sendResponse from "@/utils/responseHelper";
import { NextRequest, NextResponse } from "next/server";
import * as userServices from "@/services/userServices";

export const POST = async (req: NextRequest) => {
  try {
    // Parse the request body
    const body = await req.json();

    const parseResult = loginSchema.safeParse(body);
    if (!parseResult.success) {
      return sendResponse(400, {
        error: parseResult.error.issues[0].message,
      });
    }
    const validatedData: loginSchemaType = parseResult.data;
    const result = await userServices.userLoginService(validatedData);

    if (result?.status !== undefined) {
      return sendResponse(result.status, result);
    }
  } catch (error) {
    return sendResponse(500, { error: "Internal Server Error" });
  }
};
