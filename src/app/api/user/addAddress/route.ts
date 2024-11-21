import { CustomRequest, jwtAuth } from "@/middlewares/jwtAuthentication";
import { AddressSchemaType } from "@/types/AddressTypes";
import sendResponse from "@/utils/responseHelper";
import * as userServices from "@/services/services";
import { AddressSchema } from "@/db/model/index";
export const POST = async (req: CustomRequest) => {
  const authorization = req.headers.get("authorization");
  if (authorization) jwtAuth(req, authorization);

  const body = await req.json();

  if (!body) {
    return sendResponse(400, { message: "Missing request body" });
  }

  if (!req.user) {
    return sendResponse(401, { message: "Unauthorized" });
  }

  const { id } = req.user;
  const parseResult = AddressSchema.safeParse(body);

  if (!parseResult.success) {
    return sendResponse(400, {
      message: parseResult.error.issues[0].message,
    });
  }

  const validatedData: AddressSchemaType = parseResult.data;

  const result = await userServices.addAddressService(id, validatedData);
  if (result) return sendResponse(result!.status, result);
};
