import type { Product } from "../type/product";
import { Button } from "@heroui/react";

const PromoGrid: React.FC<{ products: Product[] }> = ({ products }) => {
  const top = products.slice(0, 2);
  const bottom = products.slice(2, 5);

  return (
    <div className="flex flex-col gap-3 py-6">
      {/* Top row — 2 large cards */}
      <div className="flex gap-3">
        {top.map((product) => (
          <div
            key={product.id}
            className="relative flex-1 h-140 rounded-lg overflow-hidden cursor-pointer group"
          >
            <img
              src={product.foto_produk}
              alt={product.nama_produk}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <Button className="border border-white text-white bg-transparent text-xs font-semibold tracking-widest uppercase px-6 py-2 rounded-full hover:bg-white hover:text-black transition">
                Shop Now
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row — 3 smaller cards */}
      <div className="flex gap-3">
        {bottom.map((product) => (
          <div
            key={product.id}
            className="relative flex-1 h-80 rounded-lg overflow-hidden cursor-pointer group"
          >
            <img
              src={product.foto_produk}
              alt={product.nama_produk}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <Button className="border border-white text-white bg-transparent text-xs font-semibold tracking-widest uppercase px-5 py-1.5 rounded-full hover:bg-white hover:text-black transition">
                Shop Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoGrid;
