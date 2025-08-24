import axios from "axios";
import OpenAI from "openai";

const { ApiError } = require("@/lib/apiError");
const { OPENAI } = require("@/utils/constant");

const openai = new OpenAI({ apiKey: OPENAI.apiKey });

const transcribeAudioVideo = async (fileUrl, format) => {
    try {
        // 1. Download file from Cloudinary using axios
        const response = await axios.get(fileUrl, {
            responseType: "arraybuffer",
        });

        const buffer = response.data;

        let mimeType;
        switch (format) {
            case "mp3":
                mimeType = "audio/mpeg";
                break;
            case "wav":
                mimeType = "audio/wav";
                break;
            case "mp4":
                mimeType = "video/mp4";
                break;
            case "webm":
                mimeType = "video/webm";
                break;
            default:
                mimeType = "application/octet-stream"; 
        }

        // 3. Convert buffer into File object
        const file = new File([buffer], `file.${format}`, { type: mimeType });

        // 4. Call Whisper translation API → English text
        const translation = await openai.audio.translations.create({
            file,
            model: "whisper-1",
        });

        console.log("Transcription (English):", translation.text);
        return translation.text;


    } catch (error) {
        console.error("Error transcribing audio/video:", error);
        throw new ApiError(500, "Transcription failed");
    }
};


const generateFeedback = async (transcript, userType, userNotes = "") => {
    try {
        let prompt;

        switch (userType) {
            case "candidate":
                prompt = `
                You are an interview coach.

                Here is the transcript of an interview response:
                "${transcript}"

                Additional context from the candidate:
                "${userNotes || "None"}"

                Provide feedback strictly in JSON format with the following structure:
                {
                  "overallRating": number (out of 10, can include decimals),
                  "strengths": [ "string", "string", ... ],
                  "improvements": [ "string", "string", ... ],
                  "detailedFeedback": "string",
                  "recommendations": [ "string", "string", ... ]
                }

                Ensure the response is only valid JSON, no extra text or commentary.
                `;
                break;

            case "recruiter":
                prompt = `
                You are a hiring expert.

                Here is the transcript of an interview response:
                "${transcript}"

                Additional context from the recruiter:
                "${userNotes || "None"}"

                Provide feedback strictly in JSON format with the following structure:
                {
                  "overallRating": number (out of 10, can include decimals),
                  "strengths": [ "string", "string", ... ],
                  "improvements": [ "string", "string", ... ],
                  "detailedFeedback": "string",
                  "recommendations": [ "string", "string", ... ]
                }

                Ensure the response is only valid JSON, no extra text or commentary.
                `;
                break;

            default:
                prompt = `
                You are an AI assistant.

                Here is the transcript of an interview response:
                "${transcript}"

                Additional context:
                "${userNotes}"

                Provide summary strictly in JSON format with the following structure:
                {
                  "overallRating": number (out of 10, can include decimals),
                  "strengths": [ "string", "string", ... ],
                  "improvements": [ "string", "string", ... ],
                  "detailedFeedback": "string",
                  "recommendations": [ "string", "string", ... ]
                }

                Ensure the response is only valid JSON, no extra text or commentary.
                `;
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are an expert interview analyst." },
                { role: "user", content: prompt },
            ],
            response_format: { type: "json_object" }
        });

        return JSON.parse(completion.choices[0].message.content);

    } catch (error) {
        console.error("Error generating feedback:", error);
        throw new ApiError(500, "Feedback generation failed");
    }
};


export { transcribeAudioVideo, generateFeedback }