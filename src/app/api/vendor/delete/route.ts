/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomRequest, jwtAuth } from "@/middlewares/jwtAuthentication";
import sendResponse from "@/utils/responseHelper";
import * as vendorServices from "@/services/services";

export const DELETE = async (req: CustomRequest) => {
  try {
    const authorization = req.headers.get("Authorization");

    if (!authorization) {
      return sendResponse(401, { error: "Unauthorized" });
    }
    jwtAuth(req, authorization);

    if (!req.user) {
      return sendResponse(401, {
        message: "Unauthorized",
      });
    }

    const { id } = req.user;

    const result = await vendorServices.deleteVendorService(id);

    if (result) {
      return sendResponse(result!.status, result);
    }
  } catch (error) {
    return sendResponse(500, { error: "Something went wrong" });
  }
};
