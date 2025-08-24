// pages/api/chats.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbConnect";
import Chat from "@/models/chat";
import Attachment from "@/models/attachment";
import { validateRequest } from "@/lib/validate";
import { asyncHandler } from "@/lib/asyncHandler";
import { ApiError } from "@/lib/apiError";
import { z } from "zod";
import { getUserFromToken } from "@/lib/jwt";
import { generateFeedback, transcribeAudioVideo } from "@/lib/openai";

const createChatSchema = z.object({
  publicId: z.string().min(1, "public_id is required"),
  resourceType: z.string().min(1, "resource_type is required"),
  type: z.string().min(1, "type is required"),
  userType: z.enum(["recruiter", "candidate"]),
  additionalInfo: z.string().optional(),
  secureUrl: z.string().min(1, "secureUrl is required"),
  format: z.string().min(1, "format is required"),
  name: z.string().min(1, "name is required"),
  bytes: z.number().min(1, "bytes must be greater than 0"),
});

export const POST = asyncHandler(async (req) => {
    await connectToDatabase();
    const body = await req.json();

    const user = getUserFromToken(req);
    if (!user) throw new ApiError(401, "Unauthorized");

    // Validate input
    const {
        publicId,
        resourceType,
        type,
        userType,
        additionalInfo,
        secureUrl,
        format,
        name,
        bytes,
    } = validateRequest(createChatSchema, body);

    console.log({
        publicId,
        resourceType,
        type,
        userType,
        additionalInfo,
        secureUrl,
        format,
        name,
        bytes,
    })

    // Create Chat
    const chat = await Chat.create({
        userId: user.id,
        userType,
        additionalInfo,
    });

    // Create Attachment linked to Chat
    await Attachment.create({
        publicId,
        resourceType,
        type,
        format,
        name,
        secureUrl,
        bytes: bytes,
        userId: user.id,
        targetId: chat._id,
    });

    const transcript = await transcribeAudioVideo(secureUrl, format)

    const feedback = await generateFeedback(transcript, userType, additionalInfo);

    console.log(`feedback --> `, feedback); // DEBUGGING

    //  feedback
    chat.result = JSON.stringify(feedback);
    await chat.save();

    return NextResponse.json({
        success: true,
        chat,
        feedback,
        message: "Chat and attachment created successfully",
    });
});
