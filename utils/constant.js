export const CLOUDINARY = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
  uploadUrl: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/auto/upload`
};

export const JWT = {
  accessTokenSecret: process.env.JWT_SECRET,
  accessTokenExpiresIn: "12h"
};

export const OPENAI = {
  apiKey: process.env.OPENAI_API_KEY,
};
