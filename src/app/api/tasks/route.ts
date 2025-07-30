// This file defines the API route for handling GET requests to fetch tasks.
// It uses Next.js API Routes and Prisma to interact with the database.

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET handler for fetching all tasks.
// It uses Prisma to retrieve all task records from the database.
export async function GET() {
  try {
    // --- ADD THIS DEBUG LOG ---
    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl) {
      const maskedUrl = dbUrl.replace(/:([^@]+)@/, ':****@'); // Mask the password
      console.log('Vercel DATABASE_URL (masked):', maskedUrl);
    } else {
      console.log('Vercel DATABASE_URL is NOT set!');
    }
    // --- END DEBUG LOG ---
    const tasks = await prisma.task.findMany();
    // Return the fetched tasks as JSON.
    return NextResponse.json(tasks);
  } catch (error: unknown) { // Explicitly type error as unknown
    console.error("Error fetching tasks:", error);
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      // If the error is an instance of Error, we can safely access its message property.
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string') {
      // Fallback for objects that have a message property but are not Error instances
      errorMessage = error.message;
    }
    // Return an error response if something goes wrong.
    return NextResponse.json(
      { message: "Failed to fetch tasks", error: errorMessage },
      { status: 500 }
    );
  }
}