/**
 * Cleans a part number by removing any non-alphanumeric characters.
 * Useful for the Tolerant Search feature where customers might type:
 * "123-ABC", "123 ABC", or "123ABC".
 * All of these will be converted to "123ABC".
 */
export function cleanPartNumber(partNumber: string): string {
    if (!partNumber) return "";
    // Remove spaces, hyphens, slashes, and any other special character
    return partNumber.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
}
