
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, Video, Clock, CheckCircle } from "lucide-react";

const Learning = () => {
  const courses = [
    {
      title: "피아노 기초 마스터",
      lessons: 24,
      duration: "8주",
      level: "초급",
      category: "piano",
      completed: false
    },
    {
      title: "어쿠스틱 기타 입문",
      lessons: 18,
      duration: "6주",
      level: "초급",
      category: "guitar",
      completed: false
    },
    {
      title: "바이올린 테크닉",
      lessons: 32,
      duration: "10주",
      level: "중급",
      category: "violin",
      completed: false
    },
    {
      title: "재즈 피아노 기초",
      lessons: 20,
      duration: "7주",
      level: "중급",
      category: "piano",
      completed: false
    },
    {
      title: "드럼 리듬 패턴",
      lessons: 15,
      duration: "5주",
      level: "초급",
      category: "drums",
      completed: true
    },
    {
      title: "클래식 기타 기초",
      lessons: 22,
      duration: "8주",
      level: "초급",
      category: "guitar",
      completed: true
    }
  ];

  return (
    <Layout>
      <div className="container px-4 py-10 mx-auto">
        <h1 className="mb-6 text-3xl font-bold">학습실</h1>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">전체 강의</TabsTrigger>
            <TabsTrigger value="piano">피아노</TabsTrigger>
            <TabsTrigger value="guitar">기타</TabsTrigger>
            <TabsTrigger value="violin">바이올린</TabsTrigger>
            <TabsTrigger value="drums">드럼</TabsTrigger>
            <TabsTrigger value="my">내 강의</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, i) => (
                <Card key={i} className={course.completed ? "border-green-200" : ""}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      {course.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 mb-4 bg-muted rounded-md flex items-center justify-center">
                      <span className="text-muted-foreground">강의 썸네일</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{course.lessons}개 레슨</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{course.duration}</span>
                      </div>
                    </div>
                    <div className="inline-block px-2 py-1 mb-2 text-xs font-medium rounded-full bg-muted">
                      {course.level}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={course.completed ? "outline" : "default"}>
                      {course.completed ? "다시 학습하기" : "학습 시작하기"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="piano">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.filter(c => c.category === 'piano').map((course, i) => (
                <Card key={i} className={course.completed ? "border-green-200" : ""}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      {course.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 mb-4 bg-muted rounded-md flex items-center justify-center">
                      <span className="text-muted-foreground">강의 썸네일</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{course.lessons}개 레슨</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{course.duration}</span>
                      </div>
                    </div>
                    <div className="inline-block px-2 py-1 mb-2 text-xs font-medium rounded-full bg-muted">
                      {course.level}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={course.completed ? "outline" : "default"}>
                      {course.completed ? "다시 학습하기" : "학습 시작하기"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* 나머지 탭 내용은 비슷한 구조로 구현됩니다 */}
          <TabsContent value="guitar">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.filter(c => c.category === 'guitar').map((course, i) => (
                <Card key={i} className={course.completed ? "border-green-200" : ""}>
                  {/* 동일한 카드 구조 반복 */}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      {course.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 mb-4 bg-muted rounded-md flex items-center justify-center">
                      <span className="text-muted-foreground">강의 썸네일</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{course.lessons}개 레슨</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{course.duration}</span>
                      </div>
                    </div>
                    <div className="inline-block px-2 py-1 mb-2 text-xs font-medium rounded-full bg-muted">
                      {course.level}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={course.completed ? "outline" : "default"}>
                      {course.completed ? "다시 학습하기" : "학습 시작하기"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="violin">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.filter(c => c.category === 'violin').map((course, i) => (
                <Card key={i}>
                  {/* 동일한 카드 구조 반복 */}
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 mb-4 bg-muted rounded-md flex items-center justify-center">
                      <span className="text-muted-foreground">강의 썸네일</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{course.lessons}개 레슨</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{course.duration}</span>
                      </div>
                    </div>
                    <div className="inline-block px-2 py-1 mb-2 text-xs font-medium rounded-full bg-muted">
                      {course.level}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">학습 시작하기</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="drums">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.filter(c => c.category === 'drums').map((course, i) => (
                <Card key={i} className={course.completed ? "border-green-200" : ""}>
                  {/* 동일한 카드 구조 반복 */}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      {course.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 mb-4 bg-muted rounded-md flex items-center justify-center">
                      <span className="text-muted-foreground">강의 썸네일</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{course.lessons}개 레슨</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{course.duration}</span>
                      </div>
                    </div>
                    <div className="inline-block px-2 py-1 mb-2 text-xs font-medium rounded-full bg-muted">
                      {course.level}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={course.completed ? "outline" : "default"}>
                      {course.completed ? "다시 학습하기" : "학습 시작하기"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="my">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.filter(c => c.completed).map((course, i) => (
                <Card key={i} className="border-green-200">
                  {/* 동일한 카드 구조 반복 */}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 mb-4 bg-muted rounded-md flex items-center justify-center">
                      <span className="text-muted-foreground">강의 썸네일</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{course.lessons}개 레슨</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{course.duration}</span>
                      </div>
                    </div>
                    <div className="inline-block px-2 py-1 mb-2 text-xs font-medium rounded-full bg-muted">
                      {course.level}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline">
                      다시 학습하기
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Learning;
