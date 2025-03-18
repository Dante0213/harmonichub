
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AllProductsTab } from "@/components/store/AllProductsTab";
import { InstrumentsTab } from "@/components/store/InstrumentsTab";
import { BooksTab } from "@/components/store/BooksTab";
import { VodTab } from "@/components/store/VodTab";
import { AccessoriesTab } from "@/components/store/AccessoriesTab";

const Store = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('tab') || 'all';

  useEffect(() => {
    console.log('현재 활성화된 탭:', activeTab);
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    navigate(`/store?tab=${value}`);
  };

  return (
    <Layout>
      <div className="container px-4 py-10 mx-auto">
        <Tabs defaultValue={activeTab} className="w-full" onValueChange={handleTabChange}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">전체 상품</TabsTrigger>
            <TabsTrigger value="vod">VOD 강의</TabsTrigger>
            <TabsTrigger value="instruments">악기</TabsTrigger>
            <TabsTrigger value="books">교재</TabsTrigger>
            <TabsTrigger value="accessories">악세서리</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <AllProductsTab />
          </TabsContent>
          
          <TabsContent value="vod">
            <VodTab />
          </TabsContent>
          
          <TabsContent value="instruments">
            <InstrumentsTab />
          </TabsContent>
          
          <TabsContent value="books">
            <BooksTab />
          </TabsContent>
          
          <TabsContent value="accessories">
            <AccessoriesTab />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Store;
