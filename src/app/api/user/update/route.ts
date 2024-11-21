// pages/api/user/update.ts
import { CustomRequest, jwtAuth } from "@/middlewares/jwtAuthentication";
import { updateUserSchemaType } from "@/types/userTypes";
import sendResponse from "@/utils/responseHelper";
import { updateUserSchema } from "@/db/model";
import * as userServices from "@/services/services";

export const PUT = async (req: CustomRequest) => {
  const authorization = req.headers.get("authorization");
  if (authorization) jwtAuth(req, authorization);

  if (!req.body) {
    return sendResponse(400, { message: "Missing request body" });
  }

  if (!req.user) {
    return sendResponse(401, { message: "Unauthorized" });
  }

  const { id } = req.user;

  const parseResult = updateUserSchema.safeParse(req.body);

  if (!parseResult.success) {
    return sendResponse(400, {
      message: parseResult.error.issues[0].message,
    });
  }

  const validatedData: updateUserSchemaType = parseResult.data;

  const result = await userServices.updateUserDetailsService(id, validatedData);

  if (result) {
    return sendResponse(result!.status, result);
  } else {
    return sendResponse(500, { message: "Failed to update user details" });
  }
};
