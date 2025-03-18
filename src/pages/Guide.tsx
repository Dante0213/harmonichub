
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Guide = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">이용안내</h1>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">일반 안내</TabsTrigger>
            <TabsTrigger value="lesson">레슨 안내</TabsTrigger>
            <TabsTrigger value="payment">결제 안내</TabsTrigger>
            <TabsTrigger value="faq">자주 묻는 질문</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-6">
            <div className="space-y-6">
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">서비스 소개</h2>
                <p className="text-muted-foreground mb-4">
                  하모닉 허브는 음악을 배우고 싶은 모든 사람들을 위한 온라인 음악 교육 플랫폼입니다. 
                  실시간 레슨, VOD 강의, 연습실 등 다양한 기능을 제공합니다.
                </p>
                <h3 className="text-xl font-medium mt-6 mb-2">주요 기능</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>실시간 온라인 레슨</li>
                  <li>VOD 강의 시청</li>
                  <li>개인 연습실</li>
                  <li>커뮤니티 소통</li>
                  <li>악기 및 교재 구매</li>
                </ul>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">이용 방법</h2>
                <ol className="list-decimal pl-6 space-y-4 text-muted-foreground">
                  <li>
                    <div className="font-medium">회원가입</div>
                    <p>하모닉 허브 웹사이트에서 간단한 정보 입력 후 회원가입을 완료하세요.</p>
                  </li>
                  <li>
                    <div className="font-medium">선생님 찾기</div>
                    <p>다양한 분야의 선생님들 중 나에게 맞는 선생님을 찾으세요.</p>
                  </li>
                  <li>
                    <div className="font-medium">레슨 예약</div>
                    <p>원하는 선생님과 시간을 선택하여 레슨을 예약하세요.</p>
                  </li>
                  <li>
                    <div className="font-medium">학습 시작</div>
                    <p>예약한 시간에 레슨룸에 입장하여 실시간 레슨을 받으세요.</p>
                  </li>
                </ol>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="lesson" className="mt-6">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">레슨 이용 안내</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-2">실시간 레슨</h3>
                  <p className="text-muted-foreground">
                    하모닉 허브의 실시간 레슨은 고품질 화상 및 음성 시스템을 통해 진행됩니다. 
                    선생님과 마치 같은 공간에 있는 것처럼 소통하며 레슨을 받을 수 있습니다.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">레슨 준비물</h3>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>안정적인 인터넷 연결</li>
                    <li>웹캠과 마이크가 있는 기기 (노트북, 데스크탑, 태블릿 등)</li>
                    <li>해당 악기 (필요한 경우)</li>
                    <li>수업 교재 (선생님이 지정한 경우)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">레슨 예약 및 취소</h3>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>레슨은 최소 24시간 전에 예약해야 합니다.</li>
                    <li>레슨 취소는 레슨 시작 24시간 전까지 가능합니다.</li>
                    <li>24시간 이내 취소 시 레슨비의 50%가 차감됩니다.</li>
                    <li>레슨 불참 시 레슨비 전액이 차감됩니다.</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="payment" className="mt-6">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">결제 안내</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-2">결제 방법</h3>
                  <p className="text-muted-foreground mb-2">
                    하모닉 허브에서는 다음과 같은 결제 방법을 제공합니다:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>신용카드 결제</li>
                    <li>계좌이체</li>
                    <li>간편결제 (카카오페이, 네이버페이, 토스 등)</li>
                    <li>하모닉 포인트 결제</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">환불 정책</h3>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>단일 레슨: 레슨 시작 24시간 전까지 100% 환불</li>
                    <li>레슨 패키지: 첫 레슨 완료 전 100% 환불, 이후 잔여 레슨에 대해 80% 환불</li>
                    <li>VOD 강의: 구매 후 7일 이내 50% 시청 미만 시 100% 환불</li>
                    <li>상품 구매: 배송 전 100% 환불, 배송 후 교환/반품 정책에 따름</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">하모닉 포인트</h3>
                  <p className="text-muted-foreground">
                    하모닉 포인트는 하모닉 허브 내에서 현금처럼 사용할 수 있는 포인트입니다. 
                    레슨, VOD, 상품 구매 등에 사용할 수 있으며, 다양한 이벤트와 활동을 통해 포인트를 적립할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="faq" className="mt-6">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">자주 묻는 질문</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>회원가입은 어떻게 하나요?</AccordionTrigger>
                  <AccordionContent>
                    하모닉 허브 웹사이트의 우측 상단에 있는 '회원가입' 버튼을 클릭하여 필요한 정보를 입력하면 회원가입이 완료됩니다. 
                    이메일 인증을 통해 계정을 활성화한 후 서비스를 이용할 수 있습니다.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>레슨은 어떻게 예약하나요?</AccordionTrigger>
                  <AccordionContent>
                    '선생님' 메뉴에서 원하는 선생님을 찾아 프로필을 확인한 후, '레슨 예약' 버튼을 클릭합니다. 
                    원하는 날짜와 시간을 선택하고 결제를 완료하면 레슨 예약이 확정됩니다.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>레슨에 필요한 장비는 무엇인가요?</AccordionTrigger>
                  <AccordionContent>
                    안정적인 인터넷 연결, 웹캠과 마이크가 있는 기기(노트북, 데스크탑, 태블릿 등), 해당 악기(필요한 경우), 
                    그리고 선생님이 지정한 교재가 필요합니다.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>레슨을 취소하고 싶어요. 어떻게 해야 하나요?</AccordionTrigger>
                  <AccordionContent>
                    마이페이지의 '레슨 예약 내역'에서 취소하고 싶은 레슨을 찾아 '취소' 버튼을 클릭하면 됩니다. 
                    레슨 시작 24시간 전까지 취소하면 100% 환불받을 수 있지만, 24시간 이내에 취소할 경우 50%만 환불됩니다.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>결제는 어떻게 이루어지나요?</AccordionTrigger>
                  <AccordionContent>
                    하모닉 허브는 신용카드, 계좌이체, 간편결제(카카오페이, 네이버페이, 토스 등), 하모닉 포인트 등 
                    다양한 결제 방법을 제공합니다. 레슨 예약이나 상품 구매 시 원하는 결제 방법을 선택하여 진행할 수 있습니다.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>VOD 강의는 얼마나 오래 볼 수 있나요?</AccordionTrigger>
                  <AccordionContent>
                    구매한 VOD 강의는 별도의 기간 제한 없이 영구적으로 시청할 수 있습니다. 
                    단, 서비스 정책 변경 시 사전 공지 후 접근 기간이 제한될 수 있습니다.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                  <AccordionTrigger>레슨 중 기술적 문제가 발생하면 어떻게 해야 하나요?</AccordionTrigger>
                  <AccordionContent>
                    레슨 중 기술적 문제가 발생하면 레슨룸 내의 '기술 지원' 버튼을 클릭하여 도움을 요청할 수 있습니다. 
                    문제가 해결되지 않을 경우, 레슨은 다른 날짜로 재조정될 수 있습니다.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8">
                  <AccordionTrigger>하모닉 포인트는 어떻게 얻을 수 있나요?</AccordionTrigger>
                  <AccordionContent>
                    하모닉 포인트는 레슨 참여, 리뷰 작성, 친구 추천, 이벤트 참여 등 다양한 활동을 통해 얻을 수 있습니다. 
                    또한, 현금으로 포인트를 충전할 수도 있습니다.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Guide;
