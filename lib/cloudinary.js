import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY } from "@/utils/constant";

cloudinary.config({
    cloudName: CLOUDINARY.cloudName,
    apiKey: CLOUDINARY.apiKey,
    apiSecret: CLOUDINARY.apiSecret,
});

const generateCloudinarySignature = (folder) => {
    const timestamp = Math.round(new Date().getTime() / 1000);

    // Create a unique public ID (using unix timestamp)
    const publicId = `${Math.floor(Date.now() / 1000)}-${Math.random()
        .toString(36)
        .substring(2, 8)}`;

    const signature = cloudinary.utils.api_sign_request(
        {
            timestamp,
            folder,
            public_id: publicId,
            type: "authenticated",
        },
        CLOUDINARY.apiSecret
    );

    return { signature, timestamp, publicId };
}

export { generateCloudinarySignature }