/* eslint-disable @typescript-eslint/no-unused-vars */
import sendResponse from "@/utils/responseHelper";
import * as pharmacistServices from "@/services/services";

export const GET = async () => {
  try {
    const result = await pharmacistServices.getAllPharmacistsService();

    if (result) {
      return sendResponse(result!.status, result);
    }
  } catch (error) {
    return sendResponse(500, { message: "Internal Server Error" });
  }
};
