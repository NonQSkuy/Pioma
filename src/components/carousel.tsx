import type { Product } from "../type/product";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const nextSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  }, [products.length]);

  React.useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden w-full h-full">
      <div
        className="flex w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {products.map((product: Product) => (
          <div key={product.id} className="w-full shrink-0">
            <div className="relative h-[60vh] md:h-[70vh] lg:h-[85vh]">
              <img
                src={product.foto_produk}
                alt={product.nama_produk}
                className="object-contain object-right"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/40 flex justify-start">
                <div className="text-left text-white p-4 md:p-8 max-w-2xl mt-25">
                  <h2 className="text-3xl md:text-6xl font-bold mb-4">
                    {product.nama_produk}
                  </h2>

                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-gray-200 transition duration-300"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots navigation */}
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex items-center justify-center gap-2">
          {products.map((_, i) => (
            <button
              key={i}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${currentSlide === i ? "bg-white scale-110" : "bg-white/50"}
              `}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(i);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
