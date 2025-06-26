"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setIsopen] = useState(false);

  return (
    <nav className="flex justify-between bg-gray-100 h-16 items-center relative">
      <h1 className="ml-20 text-2xl text-orange-500">Your Project Manager</h1>
      <div className="hidden md:flex gap-6 mr-3 pr-4 text-orange-500">
        <Link href="/">Home</Link>
        <Link href="/kanban">Kanban</Link>
      </div>
      <button
        className="md:hidden text-orange-500 p-2"
        onClick={() => setIsopen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
      {open && (
        <div className="absolute top-16 left-0 w-full bg-blue-100 flex flex-col items-center gap-4 py-4 md:hidden">
          <Link href="/">Home</Link>
          <Link href="/kanban">Kanban</Link>
          
        </div>
      )}
    </nav>
  );
}
