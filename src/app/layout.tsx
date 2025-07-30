import Navbar from "./components/Navbar";
import "./globals.css";

import { ReactNode } from "react";


export const metadata = {
  title: "Kanbanly",
  description: "kanban-style project-manager",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <main>{children}</main>
      </body>
    </html>
  );
}
