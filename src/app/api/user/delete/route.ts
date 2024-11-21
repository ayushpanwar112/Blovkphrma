import { CustomRequest, jwtAuth } from "@/middlewares/jwtAuthentication";
import * as userServices from "@/services/services";
import sendResponse from "@/utils/responseHelper";

export const DELETE = async (req: CustomRequest) => {
  const authorization = req.headers.get("authorization");

  if (authorization) jwtAuth(req, authorization);

  if (!req.user) {
    return sendResponse(401, { message: "Unauthorized" });
  }

  const { id } = req.user;

  const result = await userServices.deleteUserService(id);

  if (result?.status !== undefined) {
    return sendResponse(result.status, result);
  }
};
