
import { Link } from "react-router-dom";
import { 
  Home, Video, Save, Clock, List, Theater, 
  Newspaper, Briefcase, Search, Music, 
  MessageSquare, Heart 
} from "lucide-react";

const sidebarItems = [
  { 
    title: "메인 메뉴",
    items: [
      { name: "홈", icon: Home, link: "/" },
      { name: "선생님", icon: Music, link: "/teachers" },
      { name: "SNS", icon: MessageSquare, link: "/social", active: true },
      { name: "학습실", icon: Heart, link: "/learning" },
      { name: "스토어", icon: Search, link: "/store" }
    ]
  },
  {
    title: "My 카테고리",
    items: [
      { name: "최근 본 영상", icon: Video, link: "#recent-videos" },
      { name: "좋아요 한 영상", icon: Heart, link: "#liked-videos" },
      { name: "저장 한 영상", icon: Save, link: "#saved-videos" },
      { name: "나중에 볼 영상", icon: Clock, link: "#watch-later" }
    ]
  },
  {
    title: "새로운 소식",
    items: [
      { name: "하모닉TOP100", icon: List, link: "#top-100" },
      { name: "공연소식", icon: Theater, link: "#performances" },
      { name: "뉴스소식", icon: Newspaper, link: "#news" },
      { name: "사업소식", icon: Briefcase, link: "#business" },
      { name: "더 많은 영상 찾아보기", icon: Search, link: "#more-videos" }
    ]
  }
];

export const SocialSidebar = () => {
  return (
    <aside className="w-64 h-screen bg-background border-r fixed left-0 top-16 p-4 overflow-y-auto hidden md:block">
      <div className="flex items-center mb-6">
        <Music className="w-6 h-6 mr-2 text-primary" />
        <span className="text-xl font-bold">Harmonic Hub</span>
      </div>

      <div className="space-y-6">
        {sidebarItems.map((category, idx) => (
          <div key={idx} className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {category.title}
            </h3>
            <ul className="space-y-1">
              {category.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <Link 
                    to={item.link} 
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                      item.active ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};
