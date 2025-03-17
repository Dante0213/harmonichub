
import { VodCard } from "./VodCard";
import { vodData } from "./productsData";

export const VodTab = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {vodData.map((vod, i) => (
        <VodCard 
          key={i}
          name={vod.name}
          price={vod.price}
          description={vod.description}
          instructor={vod.instructor}
          level={vod.level}
          duration={vod.duration}
        />
      ))}
    </div>
  );
};
