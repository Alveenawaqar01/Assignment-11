import { NextResponse } from "next/server";

// Define the external API URL
const EXTERNAL_API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function GET() {
    try {
        // Fetch data from the external API
        const response = await fetch(EXTERNAL_API_URL);

        // Check if the response is not OK
        if (!response.ok) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Failed to fetch data from the API",
                },
                { status: response.status }
            );
        }

        // Parse the response as JSON
        const data = await response.json();
        return NextResponse.json({ success: true, data });
    } catch (error) {
        // Ensure proper type checking for error
        if (error instanceof Error) {
            return NextResponse.json({
                success: false,
                message: "An error occurred",
                error: error.message,
            });
        }

        return NextResponse.json({
            success: false,
            message: "An unknown error occurred",
        });
    }
}
