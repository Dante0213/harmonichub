
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AllProductsTab } from "@/components/store/AllProductsTab";
import { InstrumentsTab } from "@/components/store/InstrumentsTab";
import { BooksTab } from "@/components/store/BooksTab";
import { VodTab } from "@/components/store/VodTab";
import { AccessoriesTab } from "@/components/store/AccessoriesTab";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProductRegistrationDialog } from "@/components/store/ProductRegistrationDialog";

const Store = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('tab') || 'all';
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  useEffect(() => {
    console.log('현재 활성화된 탭:', activeTab);
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    navigate(`/store?tab=${value}`);
  };

  return (
    <Layout>
      <div className="container px-4 py-10 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Tabs defaultValue={activeTab} className="w-full" onValueChange={handleTabChange}>
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all">전체 상품</TabsTrigger>
                <TabsTrigger value="vod">VOD 강의</TabsTrigger>
                <TabsTrigger value="instruments">악기</TabsTrigger>
                <TabsTrigger value="books">교재</TabsTrigger>
                <TabsTrigger value="accessories">악세서리</TabsTrigger>
              </TabsList>
              <Button 
                onClick={() => setIsRegistrationOpen(true)}
                className="h-10"
              >
                <Plus className="mr-2 h-4 w-4" /> 상품등록하기
              </Button>
            </div>
            
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
      </div>
      <ProductRegistrationDialog 
        isOpen={isRegistrationOpen} 
        onClose={() => setIsRegistrationOpen(false)} 
      />
    </Layout>
  );
};

export default Store;
