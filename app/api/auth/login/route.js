import { NextResponse } from "next/server";
import { z } from "zod";
import User from "@/models/user";
import { validateRequest } from "@/lib/validate";
import { signToken } from "@/lib/jwt";
import { connectToDatabase } from "@/lib/dbConnect";
import { asyncHandler } from "@/lib/asyncHandler";
import { ApiError } from "@/lib/apiError";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const POST = asyncHandler(async (req) => {
    await connectToDatabase();
    const body = await req.json();

    // validate input
    const { email, password } = validateRequest(loginSchema, body);

    // find user
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }

    // check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
    }

    // check status & is_deleted
    if (!user.status || user.is_deleted) {
        throw new ApiError(403, "Account inactive or deleted");
    }

    // generate JWT
    const token = signToken({ id: user._id, email: user.email });

    return NextResponse.json({
        status: true,
        message: "Login successful",
        accessToken: token,
    });
})
