import { Card, CardContent, CardFooter, Chip } from "@heroui/react";
import type { Product } from "../type/product";
import { useNavigate } from "react-router-dom";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);

export const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="group cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <CardContent className="p-0 m-0  relative aspect-square bg-red-100 overflow-hidden rounded-none">
        {product.discount > 0 && (
          <Chip
            size="sm"
            className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-medium"
          >
            {product.discount}% off
          </Chip>
        )}
        <img
          src={product.foto_produk}
          alt={product.nama_produk}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </CardContent>

      <CardFooter className="flex-col items-start gap-1 p-0 pt-3">
        <div className="flex justify-between items-start gap-3 w-full">
          <p className="text-sm text-gray-900 text-left leading-snug line-clamp-2 flex-1 min-w-0">
            {product.nama_produk}
          </p>
          <div className="text-right shrink-0 text-sm leading-snug">
            <span className="text-gray-400 line-through block">
              {formatPrice(product.harga)}
            </span>
            <span className="font-semibold text-gray-900">
              {formatPrice(product.harga_setelah_discount)}
            </span>
          </div>
        </div>

        {product.warna && (
          <p className="text-xs text-gray-500">{product.warna}</p>
        )}

        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-1 pt-1">
            {product.colors.map((color, i) => (
              <button
                key={i}
                className="w-4 h-4 rounded-full border border-gray-200 cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-gray-400"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}

        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {product.tags.map((tag) => (
              <Chip
                key={tag}
                size="sm"
                variant="primary"
                className="border-gray-300 h-5 text-xs text-gray-600 uppercase tracking-wide px-1"
              >
                {tag}
              </Chip>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
