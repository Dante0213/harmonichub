
import { Card, CardContent } from "@/components/ui/card";
import { User, ShoppingBag, MessageCircle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export function Features() {
  const features = [
    {
      icon: User,
      title: "선생님",
      link: "/teachers"
    },
    {
      icon: MessageCircle,
      title: "SNS",
      link: "/social"
    },
    {
      icon: BookOpen,
      title: "학습실",
      link: "/learning"
    },
    {
      icon: ShoppingBag,
      title: "스토어",
      link: "/store"
    }
  ];

  return (
    <section className="py-10">
      <div className="container px-4 mx-auto">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Link key={index} to={feature.link} className="block transition-transform hover:scale-105">
              <Card className="flex flex-col items-center justify-center h-[236px] w-[236px] mx-auto transition-all hover:shadow-md">
                <div className="p-6 rounded-full bg-primary/10 mb-4">
                  <feature.icon className="w-12 h-12 text-primary" />
                </div>
                <CardContent className="text-center">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
