/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/responseHelper.ts
import { NextResponse } from "next/server";

// Define a type for the response data

interface ResponseData {
  status?: number;
  message?: string;
  error?: string;
  data?: any;
  body?: any;
}

// Utility function for sending responses
const sendResponse = (status: number, data: ResponseData) => {
  if (status >= 200 && status <= 299) {
    const responseBody = {
      status: true,
      message: data.message ? data.message : data.error,
      data: data.data ? data.data : data.body,
    };

    return NextResponse.json(responseBody, { status });
  } else if (status >= 400 && status <= 499) {
    const responseBody = {
      status: false,
      error: data.message ? data.message : data.error,
      data: null,
    };

    return NextResponse.json(responseBody, { status });
  } else {
    return NextResponse.json(data, { status });
  }
};

export default sendResponse;
