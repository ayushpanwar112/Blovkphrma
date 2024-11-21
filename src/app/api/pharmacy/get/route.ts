/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomRequest, jwtAuth } from "@/middlewares/jwtAuthentication";
import sendResponse from "@/utils/responseHelper";
import * as pharmacistServices from "@/services/services";

export const GET = async (req: CustomRequest) => {
  try {
    const authorization = req.headers.get("Authorization");

    if (authorization) {
      jwtAuth(req, authorization);
    }

    if (!req.user) {
      return sendResponse(401, {
        message: "Unauthorized",
      });
    }

    const { id } = req.user;
    const result = await pharmacistServices.getPharmacistByIdService(id);

    if (result) {
      return sendResponse(result!.status, result);
    } else {
      return sendResponse(500, { message: "Internal Server Error" });
    }
  } catch (error) {
    return sendResponse(500, { message: "Internal Server Error" });
  }
};
