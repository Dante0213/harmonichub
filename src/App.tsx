import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

// GitHub Pages의 기본 URL 경로 설정
const basename = '/music-learn-connect';
console.log('Using basename:', basename);
console.log('Current path:', window.location.pathname);
console.log('Environment mode:', import.meta.env.MODE);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={basename}>
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
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
