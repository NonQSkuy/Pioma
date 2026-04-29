import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@heroui/react";
import { useRef } from "react";
import { products } from "../core/utils/data";

export default function CardSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      if (direction === "left") {
        scrollContainerRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        scrollContainerRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };
  return (
    <div className="flex items-center gap-5">
      <Button
        className="border border-gray-300 text-gray-700 bg-white rounded-full p-2 hover:bg-gray-100 transition"
        onClick={() => scroll("left")}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-4 py-4 scroll-smooth scrollbar-hide"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="relative shrink-0 h-180 rounded-lg overflow-hidden cursor-pointer scroll-smooth scrollbar-hide group"
            style={{ width: "calc(33.2% - 11px)" }}
          >
            <img
              src={product.foto_produk}
              alt={product.nama_produk}
              style={{ width: "100%", height: "100%" }}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="210px"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-white/55" />
            {/* Card bottom content */}
            <div className="absolute bottom-3 left-0 right-0 flex flex-col items-center gap-2 px-3">
              <p className="text-white text-sm font-semibold italic text-center drop-shadow">
                {product.nama_produk.split(" ").slice(1, 3).join(" ")}
              </p>
              <button className="bg-white text-black text-xs font-medium px-5 py-1.5 rounded-full hover:bg-gray-100 transition">
                Shop
              </button>
            </div>
            {/* Discount badge */}
            {product.discount > 0 && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                -{product.discount}%
              </span>
            )}
          </div>
        ))}
      </div>
      <Button onClick={() => {scroll("right")}} className="border border-gray-300 text-gray-700 bg-white rounded-full p-2 hover:bg-gray-100 transition">
        <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </div>
  );
}
