
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // 추가 디버깅 정보
    console.log("Full URL:", window.location.href);
    console.log("Base element:", document.querySelector("base")?.href);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8 max-w-lg">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <p className="text-xl text-foreground mb-6">해당 페이지를 찾을 수 없습니다</p>
          <p className="mb-8 text-muted-foreground">
            요청하신 페이지가 이동되었거나 삭제되었을 수 있습니다.
          </p>
          <p className="mb-4 text-sm text-muted-foreground">
            현재 경로: {location.pathname}
          </p>
          <Link 
            to="/" 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
