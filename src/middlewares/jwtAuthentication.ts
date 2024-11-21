/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// middlewares/jwtAuthentication.ts
import jwt from "jsonwebtoken";
import { JwtPayload } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.SECRET_KEY;

// Extend the Request interface to include `user`
export interface CustomRequest extends NextRequest {
  user?: JwtPayload;
  query?: string;
  params?: string;
}

const jwtAuth = async (req: CustomRequest, token: string) => {
  if (!token) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized - No Authorization header provided",
    });
  }

  const authToken = token.split(" ")[1];

  if (!authToken) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized - No token provided",
    });
  }

  try {
    if (SECRET) {
      // Verify JWT and attach payload to req.user
      jwt.verify(authToken, SECRET, (err: any, payload: any) => {
        if (err || !payload) {
          return NextResponse.json({
            status: 401,
            message: "Unauthorized - Invalid token",
          });
        }

        req.user = payload as JwtPayload; // Attach the decoded payload to req.user
        NextResponse.next();
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized - Invalid token",
    });
  }
};

const tokenGenerator = (payload: object) => {
  // Generate the JWT token with the given payload and expiration time
  const token = jwt.sign(payload, `${process.env.SECRET_KEY}`, {
    expiresIn: "30d",
  });
  const tokenResponse = "Bearer " + token;
  return tokenResponse;
};

export { jwtAuth, tokenGenerator };
