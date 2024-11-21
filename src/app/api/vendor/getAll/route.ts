/* eslint-disable @typescript-eslint/no-unused-vars */
import sendResponse from "@/utils/responseHelper";
import * as vendorServices from "@/services/services";

export const GET = async () => {
  try {
    const result = await vendorServices.getAllVendorsService();

    if (result) {
      return sendResponse(result!.status, result);
    }
  } catch (error) {
    return sendResponse(500, { message: "Internal Server Error" });
  }
};
