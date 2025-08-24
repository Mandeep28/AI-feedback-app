// models/Chat.js
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        userType: { type: String, required: true }, // e.g., "recruiter" or "interviewee"
        additionalInfo: { type: String },
        result: { type: String }, // feedback result from AI
    },
    { timestamps: true }
);

export default mongoose.models.Chat || mongoose.model("Chat", chatSchema);