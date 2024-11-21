/* eslint-disable @typescript-eslint/no-unused-vars */
import sendResponse from "@/utils/responseHelper";
import * as userServices from "@/services/userServices";
import { CustomRequest, jwtAuth } from "@/middlewares/jwtAuthentication";

interface Passwords {
  oldPassword: string;
  newPassword: string;
}

export const PUT = async (req: CustomRequest) => {
  const authorization = req.headers.get("authorization");

  if (authorization) jwtAuth(req, authorization);

  if (!req.user) {
    return sendResponse(401, { message: "Unauthorized" });
  }

  const { id } = req.user;
  const { oldPassword, newPassword } = (await req.json()) as Passwords;

  const result = await userServices.changePasswordService(
    id,
    oldPassword,
    newPassword
  );

  if (result?.status !== undefined) {
    return sendResponse(result?.status, result);
  }
};
