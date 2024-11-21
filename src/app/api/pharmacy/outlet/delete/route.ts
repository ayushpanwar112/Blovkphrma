/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomRequest, jwtAuth } from "@/middlewares/jwtAuthentication";
import sendResponse from "@/utils/responseHelper";
import * as pharmacistServices from "@/services/services";

export const DELETE = async (req: CustomRequest) => {
  try {
    const authorization = req.headers.get("Authorization");
    if (!authorization) {
      return sendResponse(401, { error: "Unauthorized" });
    }

    jwtAuth(req, authorization);

    const pharmacyOutletId = req.nextUrl.searchParams.get("pharmacyOutletId");

    console.log(pharmacyOutletId);
    if (!req.user) {
      return sendResponse(401, {
        message: "Unauthorized",
      });
    }

    // Ensure pharmacyOutletId exists and can be converted to a valid number
    if (!pharmacyOutletId || isNaN(Number(pharmacyOutletId))) {
      return sendResponse(400, { error: "Valid pharmacyOutletId is required" });
    }

    const result = await pharmacistServices.deletePharmacyOutletService(
      Number(pharmacyOutletId)
    );

    if (result) {
      return sendResponse(result!.status, result);
    }
  } catch (error) {
    return sendResponse(500, { error: "Something went wrong" });
  }
};
