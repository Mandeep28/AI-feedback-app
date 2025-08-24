import { NextResponse } from "next/server";

/**
 * Async handler wrapper for Next.js App Router
 * Automatically catches errors and formats JSON response
 *
 * @param {Function} fn - The API route handler (req, ctx) => NextResponse
 */
export function asyncHandler(fn) {
  return async (req, ctx) => {
    try {
      return await fn(req, ctx);
    } catch (error) {
      console.error("API Error:", error);

      let errObj = {
        status: false,
        message: error.message || "Something went wrong",
      };

      if (error?.statusCode === 400) {
        errObj.errors = error.errors; // attach validation errors
      }

      return NextResponse.json(
        { ...errObj },
        { status: error?.statusCode || 500 }
      );
    }
  };
}
