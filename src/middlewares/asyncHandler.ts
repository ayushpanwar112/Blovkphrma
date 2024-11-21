/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { CustomRequest } from "./jwtAuthentication";

const asyncHandler = (fn: (req: CustomRequest) => Promise<NextResponse>) => {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      // Call the async function and return its result
      return await fn(req);
    } catch (error) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
};

export default asyncHandler;
