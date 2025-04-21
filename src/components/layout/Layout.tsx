
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NavbarLogo } from "./navigation/NavbarLogo";
import { SecondaryNavigation } from "./navigation/SecondaryNavigation";
import { Music } from "lucide-react";

interface LayoutProps {
  children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-pastel-purple via-background to-pastel-blue">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Music className="w-6 h-6 mr-2 text-primary" />
              <span className="text-xl font-bold">Harmonic Hub</span>
            </div>
            <SecondaryNavigation />
          </div>
          
          <Navbar />
          
          <div className="text-center my-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
              Harmonic Hub
            </h1>
          </div>
          
          <div className="content-area mx-0 my-0">
            {children || <Outlet />}
          </div>
        </div>
        <Footer />
      </div>
    </TooltipProvider>
  );
}
