import { NextResponse } from "next/server";

export const ApiResponse = (data, statusCode = 201) => {
  return NextResponse.json({ data: data }, { status: statusCode });
};
