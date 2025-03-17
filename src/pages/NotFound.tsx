
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const basePath = "/music-learn-connect";

  useEffect(() => {
    // 디버깅 정보 로깅
    console.error(
      "404 오류: 존재하지 않는 경로에 접근 시도:",
      location.pathname
    );
    
    // 추가 디버깅 정보
    console.log("전체 URL:", window.location.href);
    console.log("기본 요소:", document.querySelector("base")?.href);
    console.log("Location 객체:", location);
    console.log("basename 설정:", basePath);
    console.log("문서 제목:", document.title);
    
    // 리소스 로딩 오류 점검
    document.querySelectorAll('img').forEach((img, index) => {
      console.log(`이미지 #${index + 1} 상태:`, img.complete ? '로드됨' : '로드 안됨', img.src);
    });
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
          <div className="mb-6 p-4 bg-muted rounded-md text-left">
            <h3 className="font-medium mb-2">디버깅 정보:</h3>
            <p className="text-sm text-muted-foreground mb-1">
              현재 경로: {location.pathname}
            </p>
            <p className="text-sm text-muted-foreground mb-1">
              전체 URL: {window.location.href}
            </p>
            <p className="text-sm text-muted-foreground">
              기본 경로: {basePath}/
            </p>
          </div>
          <Link 
            to="/" 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            onClick={() => console.log("홈으로 이동 클릭됨")}
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
