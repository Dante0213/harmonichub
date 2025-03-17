
import { ProductCard } from "./ProductCard";
import { productsData } from "./productsData";

export const AccessoriesTab = () => {
  const accessoriesProducts = productsData.filter(p => p.category === 'accessories');
  
  if (accessoriesProducts.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>현재 준비 중인 카테고리입니다.</p>
      </div>
    );
  }
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {accessoriesProducts.map((product, i) => (
        <ProductCard 
          key={i}
          name={product.name}
          price={product.price}
          description={product.description}
        />
      ))}
    </div>
  );
};
