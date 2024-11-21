/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomRequest, jwtAuth } from "@/middlewares/jwtAuthentication";
import sendResponse from "@/utils/responseHelper";
import * as vendorService from "@/services/services";
export const GET = async (req: CustomRequest) => {
  try {
    const authorization = req.headers.get("authorization");
    if (!authorization) return sendResponse(401, { message: "Unauthorized" });

    jwtAuth(req, authorization);

    const result = await vendorService.getOrganizationService(
      Number(req.nextUrl.searchParams.get("orgId"))
    );

    if (result) {
      return sendResponse(result!.status, result);
    }
  } catch (error) {
    return sendResponse(500, { message: "Internal Server Error" });
  }
};
