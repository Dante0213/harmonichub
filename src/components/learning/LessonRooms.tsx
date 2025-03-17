
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users2 } from "lucide-react";

interface LessonRoom {
  name: string;
  status: string;
  capacity: number;
}

interface LessonRoomsProps {
  rooms?: LessonRoom[];
}

export const LessonRooms = ({ rooms }: LessonRoomsProps) => {
  const lessonRooms = rooms || [
    { name: "피아노 레슨룸 1", status: "사용 가능", capacity: 1 },
    { name: "피아노 레슨룸 2", status: "사용 중", capacity: 1 },
    { name: "기타 레슨룸", status: "사용 가능", capacity: 2 },
    { name: "드럼 레슨룸", status: "사용 가능", capacity: 2 },
    { name: "앙상블 레슨룸", status: "사용 중", capacity: 5 },
    { name: "보컬 레슨룸", status: "사용 가능", capacity: 2 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lessonRooms.map((room, i) => (
        <Card key={i} className={room.status === "사용 중" ? "opacity-60" : ""}>
          <CardHeader>
            <CardTitle>{room.name}</CardTitle>
            <CardDescription className="flex items-center justify-between">
              <span className={`flex items-center gap-1 ${room.status === "사용 가능" ? "text-green-500" : "text-red-500"}`}>
                {room.status === "사용 가능" ? <CheckCircle className="h-3 w-3" /> : null}
                {room.status}
              </span>
              <span className="flex items-center gap-1">
                <Users2 className="h-3 w-3" /> {room.capacity}명
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" disabled={room.status === "사용 중"}>입장하기</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
