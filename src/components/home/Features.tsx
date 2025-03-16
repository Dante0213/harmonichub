
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, ShoppingBag, MessageCircle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export function Features() {
  const features = [
    {
      icon: Video,
      title: "레슨실",
      description: "전문 음악 강사들로부터 실시간 화상 레슨을 받아보세요. 맞춤형 피드백과 지도를 통해 빠르게 성장할 수 있습니다.",
      link: "/lesson-room"
    },
    {
      icon: ShoppingBag,
      title: "스토어",
      description: "악기, 교재, 악세서리 등 음악 관련 상품을 한 곳에서 쉽게 구매할 수 있습니다.",
      link: "/store"
    },
    {
      icon: MessageCircle,
      title: "SNS",
      description: "다른 음악가들과 소통하고, 자신의 연주를 공유하며, 음악 커뮤니티의 일원이 되어보세요.",
      link: "/social"
    },
    {
      icon: BookOpen,
      title: "학습실",
      description: "다양한 학습 자료, 튜토리얼, 연습 가이드를 통해 자기 주도적으로 음악을 학습할 수 있습니다.",
      link: "/learning"
    }
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center">주요 서비스</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Link key={index} to={feature.link} className="block transition-transform hover:scale-105">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
