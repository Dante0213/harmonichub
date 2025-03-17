
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export const LessonReservation = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card>
      <CardHeader>
        <CardTitle>레슨 예약</CardTitle>
        <CardDescription>원하는 시간과 강사를 선택하여 레슨을 예약하세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
        {/* 예약 가능 시간 목록 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {["9:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map((time, i) => (
            <Button key={i} variant="outline" className="flex items-center justify-center">{time}</Button>
          ))}
        </div>
        <div className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">악기 선택</label>
              <select className="w-full p-2 border rounded-md">
                <option>피아노</option>
                <option>기타</option>
                <option>드럼</option>
                <option>바이올린</option>
                <option>보컬</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">강사 선택</label>
              <select className="w-full p-2 border rounded-md">
                <option>김지수</option>
                <option>박현우</option>
                <option>이미나</option>
                <option>정태현</option>
                <option>최서영</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">레슨 유형</label>
              <select className="w-full p-2 border rounded-md">
                <option>1회 레슨</option>
                <option>4회 패키지</option>
                <option>8회 패키지</option>
              </select>
            </div>
          </div>
          <Button className="w-full">예약하기</Button>
        </div>
      </CardContent>
    </Card>
  );
};
