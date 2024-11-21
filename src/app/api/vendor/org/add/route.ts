/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomRequest, jwtAuth } from "@/middlewares/jwtAuthentication";
import { PharmacyOutletType } from "@/types/PharmacyTypes";
import sendResponse from "@/utils/responseHelper";
import * as vendorService from "@/services/services";
import { VendorOrganizationSchema } from "@/db/model/index";
import { VendorOrganizationSchemaType } from "@/types/VendorTypes";

export const POST = async (req: CustomRequest) => {
  try {
    const authorization = req.headers.get("Authorization");

    if (authorization) {
      jwtAuth(req, authorization);

      if (!req.user) {
        return sendResponse(401, {
          message: "Unauthorized",
        });
      }

      const { id } = req.user;
      const validatedOrganizationSchema = VendorOrganizationSchema.safeParse(
        await req.json()
      );

      if (validatedOrganizationSchema.error) {
        return sendResponse(400, {
          message: validatedOrganizationSchema.error.errors[0].message,
        });
      }

      const validatedSchema: VendorOrganizationSchemaType =
        validatedOrganizationSchema.data;

      const result = await vendorService.addOrganizationService(
        id,
        validatedSchema
      );

      if (result) {
        return sendResponse(result!.status, result);
      }
    }
  } catch (error) {
    return sendResponse(500, { error: "Internal Server Error" });
  }
};
