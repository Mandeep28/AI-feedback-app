import { asyncHandler } from "@/lib/asyncHandler";
import { generateCloudinarySignature } from "@/lib/cloudinary";
import { getUserFromToken } from "@/lib/jwt";
import { validateRequest } from "@/lib/validate";
import { CLOUDINARY } from "@/utils/constant";
import { NextResponse } from "next/server";
import z from "zod";

// Allowed MIME types
const audioMimes = [
    "audio/mpeg",
    "audio/wav",
    "audio/aac",
    "audio/ogg",
    "audio/mp4",  // sometimes .m4a is reported as audio/mp4
    "audio/flac",
    "audio/webm",
];

const videoMimes = [
    "video/mp4",
    "video/quicktime", // .mov
    "video/x-msvideo", // .avi
    "video/x-matroska", // .mkv
    "video/webm",
];

const allMimes = [...audioMimes, ...videoMimes];

// Zod validation schema
const uploadSchema = z.object({
    fileType: z
        .string()
        .min(1, "File type is required")
        .refine((mime) => allMimes.includes(mime), {
            message: "Only audio or video file types are allowed",
        }),
});


export const GET = asyncHandler(async (req) => {
    const { searchParams } = new URL(req.url);
    const query = { fileType: searchParams.get("fileType") };

    const user = getUserFromToken(req);
    if (!user) throw new ApiError(401, "Unauthorized");

    // validate input
    const { fileType } = validateRequest(uploadSchema, query);

    // Decide folder based on MIME type
    let folder = audioMimes.includes(fileType) ? "audio" : videoMimes.includes(fileType) ? "video" : 'other';

    folder = `ai-insights-app/${folder}`;

    const { signature, timestamp, publicId } = generateCloudinarySignature(folder);

    return NextResponse.json({
        status: true,
        uploadUrl: CLOUDINARY.uploadUrl,
        publicId,
        folder: `${folder}`,
        signature,
        apiKey: CLOUDINARY.apiKey,
        timestamp,
    });
});