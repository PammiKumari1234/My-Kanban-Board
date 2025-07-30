import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ id: string }>;
}



// DELETE handler for deleting a task by its ID.
// The task ID is extracted from the URL parameters.
export async function DELETE(
  request: Request,
  context: RouteContext // Explicitly type the second argument as RouteContext
) {
  try {
    const { id } = await context.params;
    const taskId = parseInt(id, 10); // Access params via context.params

    if (isNaN(taskId)) {
      return NextResponse.json({ message: "Invalid Task ID" }, { status: 400 });
    }

    // Delete the task using Prisma's delete method
    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    // Return a success message with a 200 OK status
    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error deleting task:", error);
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string') {
      errorMessage = error.message;
    }
    // Return an error response if something goes wrong
    return NextResponse.json(
      { message: "Failed to delete task", error: errorMessage },
      { status: 500 }
    );
  }
}

// PATCH handler for updating a task by its ID.
// This is used to update the PStatus (and potentially other fields) when a task is dragged.
export async function PATCH(
  request: Request,
  context: RouteContext // Explicitly type the second argument as RouteContext
) {
  try {
    const { id } = await context.params;
    const taskId = parseInt(id, 10);
    const updateData = await request.json(); // Get the data to update from the request body

    if (isNaN(taskId)) {
      return NextResponse.json({ message: "Invalid Task ID" }, { status: 400 });
    }

    // Update the task using Prisma's update method
    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: updateData, // Apply the update data
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating task:", error);
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string') {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { message: "Failed to update task", error: errorMessage },
      { status: 500 }
    );
  }
}