
import { Card, CardContent } from "@/components/ui/card";
import { User, ShoppingBag, MessageCircle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export function Features() {
  const features = [
    {
      icon: User,
      title: "선생님",
      description: "나에게 맞는 음악 선생님을 찾아 학습을 시작하세요",
      link: "/teachers",
      color: "bg-luniverse-pastellavender"
    },
    {
      icon: MessageCircle,
      title: "SNS",
      description: "다른 음악가들과 소통하고 음악적 영감을 나눠보세요",
      link: "/social",
      color: "bg-luniverse-pastelpink"
    },
    {
      icon: BookOpen,
      title: "학습실",
      description: "개인 학습실에서 체계적으로 연습하고 성장하세요",
      link: "/learning",
      color: "bg-luniverse-softpurple"
    },
    {
      icon: ShoppingBag,
      title: "스토어",
      description: "악기부터 교재까지 음악 여정에 필요한 모든 것",
      link: "/store",
      color: "bg-luniverse-skyblue"
    }
  ];

  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">우리와 함께하는 음악 여정</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            음악을 배우고, A부터 Z까지 모든 과정을 도와드립니다
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Link key={index} to={feature.link} className="block transition-transform hover:scale-105">
              <Card className="card-luniverse h-full flex flex-col">
                <CardContent className="pt-8 pb-6 px-5 flex flex-col h-full">
                  <div className={`${feature.color} p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm flex-1">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
