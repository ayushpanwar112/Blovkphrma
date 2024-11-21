import { updateUserSchema } from "@/db/model";
import { CustomRequest, jwtAuth } from "@/middlewares/jwtAuthentication";
import { updateUserSchemaType } from "@/types/userTypes";
import sendResponse from "@/utils/responseHelper";
import * as userServices from "@/services/services";

export const PUT = async (req: CustomRequest) => {
  const authorization = req.headers.get("authorization");
  if (authorization) jwtAuth(req, authorization);

  if (!req.user) {
    return sendResponse(401, { message: "Unauthorized" });
  }

  const { id } = req.user;

  const parseResult = updateUserSchema.safeParse(await req.json());

  if (!parseResult.success) {
    return sendResponse(400, {
      message: parseResult.error.issues[0].message,
    });
  }

  const validatedData: updateUserSchemaType = parseResult.data;

  const result = await userServices.upgradeUserService(id, validatedData);

  if (result) {
    return sendResponse(result.status, result);
  }
};
