
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfileModal } from "../UserProfileModal";
import { Reel } from "../reels/ReelsData";
import { useSocial } from "@/pages/Social";
import { useToast } from "@/hooks/use-toast";
import { UserCheck, UserPlus } from "lucide-react";

export const RecommendedUsersPanel = () => {
  const [selectedUser, setSelectedUser] = useState<Reel | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isFollowing, followUser, unfollowUser } = useSocial();
  const { toast } = useToast();

  const recommendedUsers: Reel[] = [
    {
      id: "1",
      avatar: "김",
      user: "김선생",
      userHandle: "pianoteacher",
      isTeacher: true,
      description: "피아노 강사",
      videoUrl: "https://example.com/video1.mp4",
      hashtags: ["#피아노", "#음악교육"],
      likeCount: 1200,
      commentCount: 45,
      isLiked: false,
      // Add required Reel fields
      time: "2일 전",
      content: "피아노 연주를 공유합니다",
      likes: 1200,
      comments: 45,
      // 추가 프로필 정보
      bio: "피아노 전문 강사입니다. 클래식부터 재즈까지 다양한 장르를 가르치고 있습니다.",
      instruments: ["피아노", "키보드"],
      genres: ["클래식", "재즈"],
      education: [
        {id: "ed1", institution: "서울음악대학교", degree: "피아노학과", year: "2015-2019"}
      ],
      experience: [
        {id: "ex1", company: "음악학원", position: "피아노 강사", period: "2019-현재"}
      ],
      certificates: [
        {id: "cert1", name: "피아노 교육자격증", issuer: "한국음악교육협회", year: "2018"}
      ]
    },
    {
      id: "2", 
      avatar: "박",
      user: "박연주",
      userHandle: "violinist_park",
      isTeacher: true,
      description: "바이올리니스트",
      videoUrl: "https://example.com/video2.mp4",
      hashtags: ["#바이올린", "#클래식"],
      likeCount: 890,
      commentCount: 32,
      isLiked: false,
      // Add required Reel fields
      time: "3일 전",
      content: "바이올린 연주 영상입니다",
      likes: 890,
      comments: 32,
      // 추가 프로필 정보
      bio: "클래식 바이올리니스트입니다. 오케스트라 활동과 함께 개인 레슨도 진행합니다.",
      instruments: ["바이올린"],
      genres: ["클래식", "현대음악"],
      education: [
        {id: "ed1", institution: "국립예술대학교", degree: "관현악과", year: "2016-2020"}
      ],
      experience: [
        {id: "ex1", company: "서울 심포니 오케스트라", position: "바이올리니스트", period: "2020-현재"}
      ],
      certificates: [
        {id: "cert1", name: "바이올린 연주자격증", issuer: "한국음악협회", year: "2019"}
      ]
    },
    {
      id: "3",
      avatar: "정",
      user: "정멜로디",
      userHandle: "melody_j",
      isTeacher: false,
      description: "성악가",
      videoUrl: "https://example.com/video3.mp4",
      hashtags: ["#성악", "#오페라"],
      likeCount: 750,
      commentCount: 28,
      isLiked: false,
      // Add required Reel fields
      time: "1주 전",
      content: "오페라 연습 중입니다",
      likes: 750,
      comments: 28,
      // 추가 프로필 정보
      bio: "성악을 전공하는 음악가입니다. 오페라와 뮤지컬에 관심이 많습니다.",
      instruments: ["성악"],
      genres: ["오페라", "뮤지컬"],
      education: [
        {id: "ed1", institution: "한국음악대학", degree: "성악과", year: "2017-2021"}
      ],
      experience: [
        {id: "ex1", company: "국립오페라단", position: "성악가", period: "2021-현재"}
      ],
      certificates: [
        {id: "cert1", name: "성악 콩쿠르 우승", issuer: "전국음악콩쿠르", year: "2020"}
      ]
    },
    {
      id: "4",
      avatar: "이",
      user: "이리듬",
      userHandle: "rhythm_lee",
      isTeacher: false,
      description: "드러머",
      videoUrl: "https://example.com/video4.mp4",
      hashtags: ["#드럼", "#밴드"],
      likeCount: 920,
      commentCount: 36,
      isLiked: false,
      // Add required Reel fields
      time: "5일 전",
      content: "드럼 연주 영상입니다",
      likes: 920,
      comments: 36,
      // 추가 프로필 정보
      bio: "드럼을 연주하는 음악가입니다. 여러 밴드와 협업하고 있습니다.",
      instruments: ["드럼", "퍼커션"],
      genres: ["록", "재즈", "팝"],
      education: [
        {id: "ed1", institution: "실용음악학교", degree: "드럼전공", year: "2018-2022"}
      ],
      experience: [
        {id: "ex1", company: "스튜디오 뮤지션", position: "세션 드러머", period: "2022-현재"}
      ],
      certificates: [
        {id: "cert1", name: "드럼 연주자격증", issuer: "한국실용음악협회", year: "2021"}
      ]
    }
  ];
  
  const handleUserClick = (user: Reel) => {
    setSelectedUser(user);
    setIsProfileOpen(true);
  };

  const handleFollowToggle = (e: React.MouseEvent, user: Reel) => {
    e.stopPropagation(); // 부모 요소 클릭 이벤트 전파 방지
    
    const following = isFollowing(user.id);
    
    if (following) {
      unfollowUser(user.id);
      toast({
        title: "팔로우 취소됨",
        description: `${user.userHandle}님을 더 이상 팔로우하지 않습니다.`,
        duration: 1000
      });
    } else {
      followUser(user);
      toast({
        title: "팔로우 추가됨",
        description: `${user.userHandle}님을 팔로우합니다.`,
        duration: 1000
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">추천 사용자</h3>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {recommendedUsers.map((user) => {
              const following = isFollowing(user.id);
              return (
                <li key={user.id} className="flex items-center justify-between">
                  <div 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleUserClick(user)}
                  >
                    <Avatar>
                      {user.imageUrl ? (
                        <AvatarImage src={user.imageUrl} alt={user.user} />
                      ) : (
                        <AvatarFallback>{user.avatar}</AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.user}</p>
                    </div>
                  </div>
                  <Button 
                    variant={following ? "outline" : "default"}
                    size="sm"
                    onClick={(e) => handleFollowToggle(e, user)}
                    className="gap-1"
                  >
                    {following ? (
                      <>
                        <UserCheck className="h-3 w-3" />
                        팔로잉
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-3 w-3" />
                        팔로우
                      </>
                    )}
                  </Button>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      {selectedUser && (
        <UserProfileModal 
          user={selectedUser} 
          isOpen={isProfileOpen} 
          onClose={() => setIsProfileOpen(false)} 
        />
      )}
    </>
  );
};
