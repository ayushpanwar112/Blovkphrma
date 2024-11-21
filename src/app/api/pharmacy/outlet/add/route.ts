/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomRequest, jwtAuth } from "@/middlewares/jwtAuthentication";
import { PharmacyOutletType } from "@/types/PharmacyTypes";
import sendResponse from "@/utils/responseHelper";
import * as pharmacistServices from "@/services/services";
import { pharmacyOutletSchema } from "@/db/model/Pharmacy";

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
      const validatedPharmacySchema = pharmacyOutletSchema.safeParse(
        await req.json()
      );

      if (validatedPharmacySchema.error) {
        return sendResponse(400, {
          message: validatedPharmacySchema.error.errors[0].message,
        });
      }

      const validatedSchema: PharmacyOutletType = validatedPharmacySchema.data;

      const result = await pharmacistServices.addPharmacyOutletService(
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
