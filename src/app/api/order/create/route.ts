/* eslint-disable @typescript-eslint/no-unused-vars */
import { orderValidationSchema } from "@/db/model";
import { CustomRequest, jwtAuth } from "@/middlewares/jwtAuthentication";
import { OrderSchemaType } from "@/types/types";
import sendResponse from "@/utils/responseHelper";

import * as orderServices from "@/services/services";

export const POST = async (req: CustomRequest) => {
  try {
    const authorization = req.headers.get("authorization");

    if (authorization) jwtAuth(req, authorization);

    if (!req.user) {
      return sendResponse(401, {
        message: "Unauthorized",
      });
    }

    const { id } = req.user;
    const reqBody = await req.json();

    const orderSchema = {
      pharmacyOutletId: BigInt(reqBody.pharmacyOutletId),
      orgId: BigInt(reqBody.orgId),
      orderDate: new Date(),
      orderStatus: reqBody.orderStatus,
      paymentStatus: reqBody.paymentStatus,
      orderItems: reqBody.orderItems,
      currency: reqBody.currency,
      paymentMethod: reqBody.paymentMethod,
      amount: reqBody.amount,
      orderDetails: reqBody.orderDetails,
    };

    const validate = orderValidationSchema.safeParse(orderSchema);

    if (!validate.success) {
      console.log(validate.error.errors[0]);
      return sendResponse(400, {
        message: validate.error.errors[0].message,
      });
    }

    const validatedOrder: OrderSchemaType = validate.data;

    const result = await orderServices.createOrderService(id, validatedOrder);
    if (result.status !== undefined) {
      return sendResponse(result.status, result);
    }
  } catch (error) {
    return sendResponse(500, { message: "Internal Server Error" });
  }
};
