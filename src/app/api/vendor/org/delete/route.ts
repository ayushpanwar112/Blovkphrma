/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomRequest, jwtAuth } from "@/middlewares/jwtAuthentication";
import sendResponse from "@/utils/responseHelper";
import * as vendorService from "@/services/services";

export const DELETE = async (req: CustomRequest) => {
  try {
    const authorization = req.headers.get("Authorization");
    if (!authorization) {
      return sendResponse(401, { error: "Unauthorized" });
    }

    jwtAuth(req, authorization);

    const orgId = req.nextUrl.searchParams.get("orgId");

    if (!req.user) {
      return sendResponse(401, {
        message: "Unauthorized",
      });
    }

    // Ensure orgId exists and can be converted to a valid number
    if (!orgId || isNaN(Number(orgId))) {
      return sendResponse(400, { error: "Valid orgId is required" });
    }

    const result = await vendorService.deleteOrganizationService(Number(orgId));

    if (result) {
      return sendResponse(result!.status, result);
    }
  } catch (error) {
    return sendResponse(500, { error: "Something went wrong" });
  }
};
