
import { Link } from "react-router-dom";
import { Music } from "lucide-react";

export function NavbarLogo() {
  return (
    <Link to="/" className="flex items-center">
      <Music className="w-6 h-6 mr-2 text-primary" />
      <span className="text-xl font-bold">Harmonic Hub</span>
    </Link>
  );
}
