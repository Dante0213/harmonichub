
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { TooltipProvider } from "@/components/ui/tooltip";

interface LayoutProps {
  children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-pastel-purple via-background to-pastel-blue">
        <div className="container mx-auto px-4 py-8">
          <Navbar />
          <div className="content-area mx-0 my-0">
            {children || <Outlet />}
          </div>
        </div>
        <Footer />
      </div>
    </TooltipProvider>
  );
}
