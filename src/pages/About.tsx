
import { Layout } from "@/components/layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">하모닉 허브 소개</h1>
        
        <div className="space-y-8">
          <section className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">비전</h2>
            <p className="text-muted-foreground">
              하모닉 허브는 음악을 사랑하는 모든 사람들을 위한 온라인 음악 교육 플랫폼입니다. 
              우리는 모든 사람이 음악을 배우고, 연주하고, 공유할 수 있는 공간을 만들기 위해 노력하고 있습니다.
            </p>
          </section>
          
          <section className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">우리의 목표</h2>
            <p className="text-muted-foreground mb-4">
              하모닉 허브는 다음과 같은 목표를 가지고 있습니다:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>누구나 쉽게 접근할 수 있는 음악 교육 제공</li>
              <li>전문적인 음악 선생님들과의 연결</li>
              <li>편리한 온라인 학습 환경 구축</li>
              <li>음악 학습자들 간의 커뮤니티 형성</li>
              <li>다양한 악기와 장르의 음악 교육 제공</li>
            </ul>
          </section>
          
          <section className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">연혁</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="font-bold min-w-20">2023년</div>
                <div className="text-muted-foreground">하모닉 허브 플랫폼 개발 시작</div>
              </div>
              <div className="flex gap-4">
                <div className="font-bold min-w-20">2024년</div>
                <div className="text-muted-foreground">베타 서비스 오픈 및 첫 사용자 유입</div>
              </div>
              <div className="flex gap-4">
                <div className="font-bold min-w-20">현재</div>
                <div className="text-muted-foreground">정식 서비스 준비 중</div>
              </div>
            </div>
          </section>
          
          <section className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">팀 소개</h2>
            <p className="text-muted-foreground mb-4">
              하모닉 허브는 음악과 기술을 사랑하는 전문가들로 구성된 팀입니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <div className="p-4 border rounded-lg text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary text-xl font-bold">CEO</span>
                </div>
                <h3 className="font-medium">김하모닉</h3>
                <p className="text-sm text-muted-foreground">대표이사</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary text-xl font-bold">CTO</span>
                </div>
                <h3 className="font-medium">이테크</h3>
                <p className="text-sm text-muted-foreground">기술이사</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary text-xl font-bold">CPO</span>
                </div>
                <h3 className="font-medium">박뮤직</h3>
                <p className="text-sm text-muted-foreground">기획이사</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;
