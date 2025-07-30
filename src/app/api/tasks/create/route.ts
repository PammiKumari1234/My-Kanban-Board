// This file defines the API route for handling POST requests to create new tasks.
// It uses Next.js API Routes and Prisma to interact with the database.

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST handler for creating a new task.
// It receives task data from the request body and uses Prisma to create a new record.
export async function POST(request: Request) {
  try {
    const taskData = await request.json();
    // Validate incoming data against your Prisma model fields.
    // Prisma will automatically handle the 'id' field with @default(autoincrement()).
    const newTask = await prisma.task.create({
      data: {
        title: taskData.title,
        description: taskData.description,
        PStatus: taskData.PStatus,
        assignee: taskData.assignee,
        priority: taskData.priority,
      },
    });
    // Return the newly created task as JSON with a 201 Created status.
    return NextResponse.json(newTask, { status: 201 });
  } catch (error: unknown) { // Explicitly type error as unknown
    console.error("Error creating task:", error);
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      // If the error is an instance of Error, we can safely access its message property.
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string') {
      // Fallback for objects that have a message property but are not Error instances
      errorMessage = error.message;
    }
    return NextResponse.json(
      { message: "Failed to create task", error: errorMessage },
      { status: 500 }
    );
  }
}