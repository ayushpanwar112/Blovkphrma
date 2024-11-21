/* eslint-disable @typescript-eslint/no-unused-vars */
import { orderValidationSchema } from "@/db/model";
import { CustomRequest, jwtAuth } from "@/middlewares/jwtAuthentication";
import { OrderSchemaType } from "@/types/types";
import sendResponse from "@/utils/responseHelper";

import * as orderServices from "@/services/services";

export const GET = async (req: CustomRequest) => {
  try {
    const authorization = req.headers.get("authorization");

    if (authorization) jwtAuth(req, authorization);

    if (!req.user) {
      return sendResponse(401, {
        message: "Unauthorized",
      });
    }

    const orderId = req.nextUrl.searchParams.get("orderId");

    if (!orderId)
      return sendResponse(400, {
        message: "Missing Order Id",
      });

    const result = await orderServices.getOrderByIdService(orderId);

    if (result) return sendResponse(result.status, result);
  } catch (error) {
    return sendResponse(500, {
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
