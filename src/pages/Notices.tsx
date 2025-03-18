
import { Layout } from "@/components/layout/Layout";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// 임시 공지사항 데이터
const noticeData = [
  { id: 1, title: "하모닉 허브 정식 서비스 출시 안내", date: "2024-06-01", important: true },
  { id: 2, title: "서비스 이용약관 개정 안내", date: "2024-05-15", important: true },
  { id: 3, title: "VOD 강의 10% 할인 이벤트", date: "2024-05-10", important: false },
  { id: 4, title: "시스템 정기 점검 안내", date: "2024-05-01", important: false },
  { id: 5, title: "신규 악기 강좌 오픈 소식", date: "2024-04-20", important: false },
  { id: 6, title: "모바일 앱 출시 예정 안내", date: "2024-04-15", important: false },
  { id: 7, title: "결제 시스템 업데이트 안내", date: "2024-04-01", important: false },
  { id: 8, title: "개인정보 처리방침 변경 안내", date: "2024-03-20", important: true },
  { id: 9, title: "신규 선생님 영입 소식", date: "2024-03-10", important: false },
  { id: 10, title: "하모닉 허브 베타 서비스 오픈", date: "2024-03-01", important: true },
];

const Notices = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">공지사항</h1>
        
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">번호</TableHead>
                <TableHead>제목</TableHead>
                <TableHead className="w-[150px]">등록일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {noticeData.map((notice) => (
                <TableRow key={notice.id}>
                  <TableCell className="text-center">{notice.id}</TableCell>
                  <TableCell>
                    <Link to={`/notices/${notice.id}`} className="hover:text-primary hover:underline">
                      {notice.important && (
                        <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                          중요
                        </span>
                      )}
                      {notice.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">{notice.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex justify-center mt-6">
            <nav className="inline-flex">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-l-md">
                &lt;
              </Button>
              <Button variant="outline" size="sm" className="rounded-none border-x-0">
                1
              </Button>
              <Button variant="outline" size="sm" className="rounded-none border-x-0">
                2
              </Button>
              <Button variant="outline" size="sm" className="rounded-none border-x-0">
                3
              </Button>
              <Button variant="outline" size="sm" className="rounded-none border-x-0">
                ...
              </Button>
              <Button variant="outline" size="sm" className="rounded-none border-x-0">
                10
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-r-md">
                &gt;
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notices;
