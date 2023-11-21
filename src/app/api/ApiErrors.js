import { NextResponse } from "next/server";

export default {
  InternalServerError() {
    return NextResponse.json(
      {
        data: null,
      },
      {
        status: 500,
        statusText: "Internal server error",
      }
    );
  },
};
