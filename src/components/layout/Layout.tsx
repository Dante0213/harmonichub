
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NavbarLogo } from "./navigation/NavbarLogo";
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
            <NavbarLogo />
            <SecondaryNavigation />
          </div>
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
