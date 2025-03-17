
import { ProductCard } from "./ProductCard";
import { productsData } from "./productsData";

export const AllProductsTab = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {productsData.map((product, i) => (
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
