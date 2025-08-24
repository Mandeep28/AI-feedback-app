// models/Attachment.js
import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema(
    {
        publicId: { type: String, required: true },
        resourceType: { type: String, required: true }, // e.g., video, audio
        type: { type: String, required: true }, // e.g., upload/authenticated
        format: { type: String, required: true }, // file format like mp4, mp3
        name: { type: String, required: true }, // original filename
        bytes: { type: Number, required: true }, // file size in bytes
        secureUrl: { type: String, required: true }, // secure URL for the file
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        targetId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Attachment ||
    mongoose.model("Attachment", attachmentSchema);