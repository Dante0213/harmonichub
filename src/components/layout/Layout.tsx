
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SecondaryNavigation } from "./navigation/SecondaryNavigation";

interface LayoutProps {
  children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-pastel-purple via-background to-pastel-blue">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <div></div>
            <SecondaryNavigation />
          </div>
          
          <Navbar />
          
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center mt-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
              Harmonic Hub
            </h1>
          </div>
          
          <div className="content-area mx-0 my-0 relative">
            {children || <Outlet />}
          </div>
        </div>
        <Footer />
      </div>
    </TooltipProvider>
  );
}
