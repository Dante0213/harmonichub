
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";
import Index from "./pages/Index";
import LessonRoom from "./pages/LessonRoom";
import Store from "./pages/Store";
import Social from "./pages/Social";
import Learning from "./pages/Learning";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Teachers from "./pages/Teachers";
import MyPage from "./pages/MyPage";
import { Chatbot } from "./components/chatbot/Chatbot";

// My 카테고리 페이지들
import RecentVideos from "./pages/my/RecentVideos";
import LikedVideos from "./pages/my/LikedVideos";
import SavedVideos from "./pages/my/SavedVideos";
import WatchLater from "./pages/my/WatchLater";

// 새로운 소식 페이지들
import Top100 from "./pages/news/Top100";
import Performances from "./pages/news/Performances";
import News from "./pages/news/News";
import Business from "./pages/news/Business";
import MoreVideos from "./pages/news/MoreVideos";

// 경로 디버깅 컴포넌트
const RouteDebugger = () => {
  const location = useLocation();
  console.log('현재 경로:', location.pathname);
  console.log('경로 상태:', location.state);
  console.log('경로 검색어:', location.search);
  return null;
};

const queryClient = new QueryClient();

// GitHub Pages 배포를 위한 고정 basename
const basename = '/music-learn-connect';
console.log('고정 basename:', basename);
console.log('현재 경로:', window.location.pathname);
console.log('전체 URL:', window.location.href);
console.log('기본 URL:', document.baseURI);

const App = () => {
  console.log('App 렌더링됨 (고정 basename):', basename);
  console.log('호스트:', window.location.host);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={basename}>
            <RouteDebugger />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/lesson-room" element={<LessonRoom />} />
              <Route path="/store" element={<Store />} />
              <Route path="/social" element={<Social />} />
              <Route path="/learning" element={<Learning />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/mypage" element={<MyPage />} />
              
              {/* My 카테고리 페이지들 */}
              <Route path="/my/recent-videos" element={<RecentVideos />} />
              <Route path="/my/liked-videos" element={<LikedVideos />} />
              <Route path="/my/saved-videos" element={<SavedVideos />} />
              <Route path="/my/watch-later" element={<WatchLater />} />
              
              {/* 새로운 소식 페이지들 */}
              <Route path="/news/top-100" element={<Top100 />} />
              <Route path="/news/performances" element={<Performances />} />
              <Route path="/news/news" element={<News />} />
              <Route path="/news/business" element={<Business />} />
              <Route path="/news/more-videos" element={<MoreVideos />} />
              
              {/* 404 페이지 - 모든 경로를 캐치 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Chatbot />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
