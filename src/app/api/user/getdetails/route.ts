import { CustomRequest, jwtAuth } from "@/middlewares/jwtAuthentication";
import sendResponse from "@/utils/responseHelper";
import * as userServices from "@/services/userServices";

export const GET = async (req: CustomRequest) => {
  const authorization = req.headers.get("authorization");

  if (authorization) jwtAuth(req, authorization);

  if (!req.user) {
    return sendResponse(401, { message: "Unauthorized" });
  }

  const { id } = req.user;

  const result = await userServices.getUserByIdService(id);

  if (result?.status !== undefined) {
    return sendResponse(result.status, result);
  }
};
