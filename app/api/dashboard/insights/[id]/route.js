import Chat from "@/models/chat";
import Attachment from "@/models/attachment";
import { asyncHandler } from "@/lib/asyncHandler";
import { connectToDatabase } from "@/lib/dbConnect";
import { getUserFromToken } from "@/lib/jwt";
import { ApiError } from "@/lib/apiError";
import { NextResponse } from "next/server";

export const GET = asyncHandler(async (req, context) => {
  await connectToDatabase();

  const { id } = await context.params;
  console.log(`id --> `, id); // DEBUGGING

  // 1. Verify user
  const user = await getUserFromToken(req);
  if (!user) throw new ApiError(401, "Unauthorized");

  // 2. Check if chat exists
  const chat = await Chat.findById(id);
  if (!chat) throw new ApiError(404, "Chat not found");

  // 3. Validate ownership
  if (chat.userId.toString() !== user.id) {
    throw new ApiError(403, "Forbidden");
  }

  // 4. Fetch attachments linked to this chat
  let attachments = await Attachment.find({ targetId: chat._id });

  attachments = attachments[0] || {};

  const data = {
    chat: {
      id: chat._id,
      userType: chat.userType,
      additionalInfo: chat.additionalInfo,
      result: JSON.parse(chat.result || "{}"),
      createdAt: chat.createdAt,
    },
    attachment: {
      resourceType: attachments.resourceType,
      type: attachments.type,
      format: attachments.format,
      name: attachments.name,
      bytes: attachments.bytes,
      secureUrl: attachments.secureUrl,
    }
  }


  return NextResponse.json({
    success: true,
    data,
  });
});
