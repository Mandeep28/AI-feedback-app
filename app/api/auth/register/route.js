import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/dbConnect";
import User from "@/models/user";
import { validateRequest } from "@/lib/validate";
import { signToken } from "@/lib/jwt";
import { asyncHandler } from "@/lib/asyncHandler";
import { ApiError } from "@/lib/apiError";

const registerSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const POST = asyncHandler(async (req) => {
    await connectToDatabase();
    const body = await req.json();

    // validate input
    const { name, email, password } = validateRequest(registerSchema, body);

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "Email already registered");
    }

    // create user
    const user = await User.create({ name, email, password });

    // generate JWT
    const token = signToken({ id: user._id, email: user.email });

    return NextResponse.json({
        success: true,
        message: "Registration successful",
        accessToken: token,
    });
});