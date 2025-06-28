"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setIsopen] = useState(false);

  return (
    <nav
     className="flex justify-between bg-gray-100 h-16 items-center relative"
     style={{padding:"15px"}}
     >
      <Link href="/">
        <h1 className="ml-20 sm:ml-20 text-base sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 tracking-wide drop-shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer">Your Project Manager</h1>
      </Link>
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
        <div className="absolute top-16 left-0 w-full bg-orange-500 flex flex-col items-center gap-4 py-4 md:hidden font-bold text-white" style={{padding:"5px"}}>
          <Link href="/">Home</Link>
          <Link href="/kanban">Kanban</Link>
        </div>
      )}
    </nav>
  );
}
