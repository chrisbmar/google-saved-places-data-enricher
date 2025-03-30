// Extract CID from URL (undocumented in API docs, but CID can be used in place of place_id in the legacy `place` API)
export const extractCIDFromURL = (url: string): string | null => {
  const cidMatch = url.match(/1s[^:]+:([^&]+)/);
  if (cidMatch && cidMatch[1]) {
    return cidMatch[1];
  }
  return null;
};

// Convert a single object to CSV row
export const objectToCSVRow = (obj: Record<string, any>): string => {
  const headers = Object.keys(obj);
  return (
    headers
      .map((header) => {
        const value = obj[header] ?? "";
        // If value contains commas, wrap in quotes
        return typeof value === "string" && value.includes(",")
          ? `"${value}"`
          : value;
      })
      .join(",") + ","
  ); // Add trailing comma to end of each row
};

// Write headers to CSV file if it doesn't exist
export const writeCSVHeaders = (headers: string[], filePath: string): void => {
  const fs = require("fs");
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, headers.join(",") + "\n");
  }
};
