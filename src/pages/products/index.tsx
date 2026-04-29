import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort, faCheck } from "@fortawesome/free-solid-svg-icons";
import {
  Accordion,
  AccordionItem,
  BreadcrumbsItem,
  Breadcrumbs,
  Button,
  Checkbox,
  ColorSwatchPicker,
  CheckboxGroup,
  CheckboxControl,
  CheckboxIndicator,
  CheckboxContent,
  Label,
  Pagination,
} from "@heroui/react";
import { BasePage } from "../_components/_base";
import { products } from "../../core/utils/data";
import { ProductCard } from "../../components/card";
import type { Product } from "../../type/product";

const CATEGORIES = [
  "Semua Produk",
  "Ransel & Backpack",
  "Dompet & Selempang",
  "Tas Travel",
  "Tas Kerja & Laptop",
  "Aksesori & Pouch",
  "Tas Olahraga",
  "Lunch Bag",
];

const COLORS = [
  { name: "Black", hex: "#1a1a1a" },
  { name: "Brown", hex: "#5c3d1e" },
  { name: "Grey", hex: "#9e9e9e" },
  { name: "Blue", hex: "#1565C0" },
  { name: "Green", hex: "#2e7d32" },
  { name: "Navy", hex: "#1f3060" },
  { name: "Red", hex: "#c62828" },
  { name: "Tan", hex: "#d2b48c" },
  { name: "Pink", hex: "#e91e63" },
];

const CAPACITIES = ["10L", "15L", "20L", "25L", "30L", "40L", "50L", "60L"];
const BAG_SIZES = ["S", "M", "L", "XL", "XXL", "XXXL"];

const productEnrichment: Record<number, Partial<Product>> = {
  1: {
    warna: "Hitam",
    colors: ["#1a1a1a", "#5c3d1e", "#8b7355"],
    tags: ["WATERPROOF", "NYLON"],
  },
  2: {
    warna: "Hitam",
    colors: ["#1a1a1a", "#2b4a7a", "#5c3d1e"],
    tags: ["LAPTOP 14 INCH"],
  },
  3: {
    warna: "Abu-abu",
    colors: ["#6b6b6b", "#1a1a1a", "#2b4a7a"],
    tags: ["WATERPROOF"],
  },
  4: {
    warna: "Hitam",
    colors: ["#1a1a1a", "#d4b896"],
    tags: ["WATERPROOF", "NYLON"],
  },
  5: {
    warna: "Navy",
    colors: ["#1f3060", "#1a1a1a", "#5c3d1e"],
    tags: ["LAPTOP", "WATERPROOF"],
  },
  6: {
    warna: "Hitam",
    colors: ["#1a1a1a", "#5c3d1e", "#4a4a4a"],
    tags: ["15.9 INCH", "WATERPROOF"],
  },
};

const enrichedProducts = products.map((p) => ({
  ...p,
  ...(productEnrichment[p.id] ?? {}),
}));

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Best Rating", value: "rating" },
  { label: "Most Popular", value: "popular" },
  { label: "Newest", value: "newest" },
];

export default function ProductsListPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCapacities, setSelectedCapacities] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [showMoreColors, setShowMoreColors] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const goToPage = (n: number) => setPage(n);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const itemsPerPage = 15;
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (page > 3) {
        pages.push("ellipsis");
      }
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) {
        pages.push("ellipsis");
      }
      pages.push(totalPages);
    }
    return pages;
  };
  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);
  const paginatedProducts = enrichedProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const visibleCategories = showMoreCategories
    ? CATEGORIES
    : CATEGORIES.slice(0, 5);
  const visibleColors = showMoreColors ? COLORS : COLORS.slice(0, 6);

  function toggleItem(
    arr: string[],
    setArr: (v: string[]) => void,
    item: string,
  ) {
    setArr(arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]);
  }

  return (
    <BasePage>
      <div className="flex gap-8 min-h-screen">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 pt-4 sticky top-0 self-start max-h-screen overflow-y-auto">
          <p className="text-sm text-gray-700 font-medium mb-4">
            {enrichedProducts.length} Products
          </p>

          <Accordion
            defaultExpandedKeys={["category", "color", "size"]}
            allowsMultipleExpanded
            className="px-0"
            // classNames={{
            //   base: "py-0",
            //   title:
            //     "text-xs font-semibold text-gray-900 uppercase tracking-wide",
            //   trigger: "py-3",
            //   content: "pb-4 pt-0",
            // }}
          >
            <AccordionItem key="category">
              <Accordion.Heading>
                <Accordion.Trigger>
                  Category
                  <Accordion.Indicator />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body>
                  <CheckboxGroup>
                    {visibleCategories.map((cat) => (
                      <Checkbox
                        value={cat}
                        key={cat}
                        isSelected={selectedCategories.includes(cat)}
                        onChange={(checked) =>
                          checked
                            ? setSelectedCategories([
                                ...selectedCategories,
                                cat,
                              ])
                            : setSelectedCategories(
                                selectedCategories.filter((x) => x !== cat),
                              )
                        }
                      >
                        <CheckboxControl>
                          <CheckboxIndicator />
                        </CheckboxControl>
                        <CheckboxContent>
                          <Label className="text-sm text-gray-700">{cat}</Label>
                        </CheckboxContent>
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                </Accordion.Body>
              </Accordion.Panel>
            </AccordionItem>

            <AccordionItem key="color">
              <Accordion.Heading>
                <Accordion.Trigger>
                  Color
                  <Accordion.Indicator />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body>
                  <ColorSwatchPicker>
                    {COLORS.map((color) => (
                      <ColorSwatchPicker.Item color={color.hex}>
                        <ColorSwatchPicker.Swatch />
                        <ColorSwatchPicker.Indicator />
                      </ColorSwatchPicker.Item>
                    ))}
                  </ColorSwatchPicker>
                </Accordion.Body>
              </Accordion.Panel>
            </AccordionItem>

            <AccordionItem key="size">
              <Accordion.Heading>
                <Accordion.Trigger>
                  Size
                  <Accordion.Indicator />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body></Accordion.Body>
              </Accordion.Panel>
            </AccordionItem>
          </Accordion>
        </aside>

        {/* Main content */}
        <main className="flex-1 pt-4">
          {/* Breadcrumb */}
          <Breadcrumbs className="mb-2 text-gray-500">
            <BreadcrumbsItem>
              <Link to="/">Home</Link>
            </BreadcrumbsItem>
            <BreadcrumbsItem>Products</BreadcrumbsItem>
          </Breadcrumbs>

          {/* Page title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            PIOMA — Tas &amp; Ransel Wanita
          </h1>

          {/* Featured label + Sort */}
          <div className="flex items-center justify-between mb-6 mt-4">
            <span className="text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-1">
              {SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "Featured"}
            </span>

            {/* Sort by dropdown */}
            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center gap-2 text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-gray-400 hover:text-black transition-colors bg-white shadow-sm"
              >
                <FontAwesomeIcon icon={faArrowDownWideShort} className="text-gray-500" />
                <span className="font-medium">Sort by</span>
                <span className="text-gray-400 text-xs">
                  {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                </span>
              </button>

              {sortOpen && (
                <div className="absolute right-0 mt-1 w-52 bg-white border border-gray-100 rounded-xl shadow-lg z-30 py-1 overflow-hidden">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                        sortBy === opt.value
                          ? "bg-gray-50 text-black font-medium"
                          : "text-gray-600 hover:bg-gray-50 hover:text-black"
                      }`}
                    >
                      {opt.label}
                      {sortBy === opt.value && (
                        <FontAwesomeIcon icon={faCheck} className="text-xs text-black" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-3 gap-x-6 gap-y-10">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination size="lg" className="justify-center my-10">
            <Pagination.Summary>
              Showing {startItem}-{endItem} of {totalItems} results
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={page === 1}
                  onPress={() => goToPage(page - 1)}
                >
                  <Pagination.PreviousIcon />
                  <span>Previous</span>
                </Pagination.Previous>
              </Pagination.Item>
              {getPageNumbers().map((p, i) =>
                p === "ellipsis" ? (
                  <Pagination.Item key={`ellipsis-${i}`}>
                    <Pagination.Ellipsis />
                  </Pagination.Item>
                ) : (
                  <Pagination.Item key={p}>
                    <Pagination.Link
                      isActive={p === page}
                      onPress={() => goToPage(p)}
                    >
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                ),
              )}
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={page === totalPages}
                  onPress={() => goToPage(page + 1)}
                >
                  <span>Next</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </main>
      </div>
    </BasePage>
  );
}
