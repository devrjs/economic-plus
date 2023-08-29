"use client";

import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { ReactNode, useState } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  const [expandedSidebar, setExpandedSidebar] = useState(false);

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-[1600px] overflow-auto flex gap-4 p-4">
        <Sidebar expanded={expandedSidebar} />

        <main className="w-full flex flex-col gap-4">
          <Topbar
            expandedSidebar={() => setExpandedSidebar(!expandedSidebar)}
          />

          {children}
        </main>
      </div>
    </div>
  );
}
