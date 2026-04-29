import CardSlider from "../components/card.slider";
import ProductCarousel from "../components/carousel";
import PromoGrid from "../components/promo-grid";
import { carouselData, products } from "../core/utils/data";
import { BasePage } from "./_components/_base";

export default function Home() {
  return (
    <div className="flex flex-col">
      <ProductCarousel products={carouselData} />
      <BasePage>
        <CardSlider />
        <PromoGrid products={products} />
      </BasePage>
    </div>
  );
}
