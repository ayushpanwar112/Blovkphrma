/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomRequest, jwtAuth } from "@/middlewares/jwtAuthentication";
import sendResponse from "@/utils/responseHelper";

import * as orderServices from "@/services/services";

export const PUT = async (req: CustomRequest) => {
  try {
    const authorization = req.headers.get("authorization");
    if (authorization) jwtAuth(req, authorization);

    if (!req.user) {
      return sendResponse(401, {
        message: "Unauthorized",
      });
    }

    const { id } = req.user;
    const { orderId } = await req.json();

    const result = await orderServices.cancelOrderService(orderId, id);
    if (result) {
      return sendResponse(result.status, result);
    }
  } catch (error) {
    return sendResponse(500, { message: "Internal Server Error" });
  }
};
