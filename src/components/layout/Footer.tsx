
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold gradient-text">Harmonic Hub</h3>
            <p className="text-sm text-muted-foreground">
              실시간 화상 레슨이 가능한 온라인 음악 플랫폼에서 여러분의 음악 여정을 시작하세요.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">서비스</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/lesson-room" className="text-muted-foreground hover:text-luniverse-purple transition-colors">레슨실</Link></li>
              <li><Link to="/store" className="text-muted-foreground hover:text-luniverse-purple transition-colors">스토어</Link></li>
              <li><Link to="/social" className="text-muted-foreground hover:text-luniverse-purple transition-colors">SNS</Link></li>
              <li><Link to="/learning" className="text-muted-foreground hover:text-luniverse-purple transition-colors">학습실</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">회사</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-luniverse-purple transition-colors">소개</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-luniverse-purple transition-colors">연락처</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-luniverse-purple transition-colors">채용</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">법적 고지</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-muted-foreground hover:text-luniverse-purple transition-colors">개인정보처리방침</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-luniverse-purple transition-colors">이용약관</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 text-sm text-center border-t border-border">
          <p className="text-muted-foreground">&copy; {currentYear} Harmonic Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
