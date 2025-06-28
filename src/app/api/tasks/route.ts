import { NextResponse } from "next/server";

const tasks=[
    {
      id: 1,
      title: "setup",
      description: "This is a new project",
      PStatus: "done",
      assignee: "Pammi",
      priority: "high",
    },
    {
      id: 2,
      title: "Navbar",
      description: "Navbar completed",
      PStatus: "inProgress",
      assignee: "Ritik",
      priority: "low",
    },
    {
      id: 3,
      title: "state management",
      description: "This needs to be done",
      PStatus: "backlog",
      assignee: "Pammi",
      priority: "low",
    },
    {
      id: 4,
      title: "homepage",
      description: "setup the homepage",
      PStatus: "backlog",
      assignee: "Pammi",
      priority: "medium",
    },
  ];

  export async function GET(){
    return NextResponse.json(tasks);
  }

  export async function POST(request:Request){
    const newTask= await request.json();
    newTask.id=Date.now().toString();
    tasks.push(newTask);
    return new Response(JSON.stringify(newTask),{
      status:201,
      headers:{
        "Content-type":"application/json"
      }
    });

  }