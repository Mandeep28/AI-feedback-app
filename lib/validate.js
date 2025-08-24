import { ZodError } from "zod";
import { ApiError } from "./apiError";

/**
 * Validate request body against a Zod schema
 * @param {ZodSchema} schema
 * @param {Object} data
 * @returns {Object} - parsed data if valid, or throws structured errors
 */
export function validateRequest(schema, data) {
    try {
        return schema.parse(data);
    } catch (error) {
        if (error instanceof ZodError) {
            // Build an object with field -> message
            const formattedErrors = {};
            error.issues.forEach((issue) => {
                const field = issue.path[0];
                if (!formattedErrors[field]) {
                    formattedErrors[field] = issue.message;
                }
            });

            // Throw structured ApiError instead of generic Error
            throw new ApiError(400, "Validation failed", formattedErrors);
        }

        // Rethrow any other error
        throw error;
    }
}