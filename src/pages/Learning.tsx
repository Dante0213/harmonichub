
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LessonSchedule } from "@/components/learning/LessonSchedule";
import { VodProgress } from "@/components/learning/VodProgress";
import { HomeworkSubmission } from "@/components/learning/HomeworkSubmission";
import { HomeworkHistory } from "@/components/learning/HomeworkHistory";
import { LessonHistory } from "@/components/learning/LessonHistory";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Music, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Learning = () => {
  return (
    <Layout>
      <div className="container px-4 py-10 mx-auto">
        <Alert className="mb-8">
          <Info className="h-4 w-4" />
          <AlertTitle>안내</AlertTitle>
          <AlertDescription>
            개인 학습실에서 레슨 일정 확인, 숙제 제출, VOD 학습 진도 확인 등을 할 수 있습니다.
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* 일정 관리 */}
          <LessonSchedule />
          
          {/* VOD 진도율 */}
          <VodProgress />
          
          {/* 숙제 제출 */}
          <HomeworkSubmission />
        </div>
        
        <Tabs defaultValue="received" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="received">받은 과제</TabsTrigger>
            <TabsTrigger value="history">지난 과제</TabsTrigger>
            <TabsTrigger value="lesson-history">레슨 기록</TabsTrigger>
          </TabsList>
          
          <TabsContent value="received">
            <HomeworkHistory showSubmitted={false} />
          </TabsContent>
          
          <TabsContent value="history">
            <HomeworkHistory showSubmitted={true} />
          </TabsContent>
          
          <TabsContent value="lesson-history">
            <LessonHistory />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Learning;
