
import { useLocation } from "react-router-dom";

interface MainNavigationProps {
  handleNavClick: (path: string) => void;
}

export function MainNavigation({ handleNavClick }: MainNavigationProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="hidden md:flex md:items-center md:gap-3 py-2 border-t">
      <button 
        onClick={() => handleNavClick('/teachers')}
        className={`px-3 py-2 text-sm font-medium ${isActive('/teachers') ? 'text-primary' : 'hover:text-primary'}`}
      >
        선생님
      </button>
      <button 
        onClick={() => handleNavClick('/social')}
        className={`px-3 py-2 text-sm font-medium ${isActive('/social') ? 'text-primary' : 'hover:text-primary'}`}
      >
        SNS
      </button>
      <button 
        onClick={() => handleNavClick('/learning')}
        className={`px-3 py-2 text-sm font-medium ${isActive('/learning') ? 'text-primary' : 'hover:text-primary'}`}
      >
        학습실
      </button>
      <button 
        onClick={() => handleNavClick('/store')}
        className={`px-3 py-2 text-sm font-medium ${isActive('/store') ? 'text-primary' : 'hover:text-primary'}`}
      >
        스토어
      </button>
    </div>
  );
}
