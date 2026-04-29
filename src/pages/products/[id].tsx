import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BasePage } from "../_components/_base";
import {
  Accordion,
  AccordionItem,
  Breadcrumbs,
  BreadcrumbsItem,
  Button,
  Checkbox,
  CheckboxGroup,
  IconChevronDown,
} from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faHeart,
  faMinus,
  faPlus,
  faCartShopping,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { reviewDataTemp } from "../../core/utils/data";
import CardSlider from "../../components/card.slider";

const productImages = [
  "https://down-id.img.susercontent.com/file/id-11134207-8224o-micgpmtkv94y04.webp",
  "https://down-id.img.susercontent.com/file/id-11134207-7rbke-m9leurk1oeur40.webp",
  "https://down-id.img.susercontent.com/file/id-11134207-7rbka-m9l06sgc704e61.webp",
  "https://down-id.img.susercontent.com/file/id-11134207-8224o-micgpmtkv94y04.webp",
  "https://down-id.img.susercontent.com/file/id-11134207-7rbk9-m9lef3nwv77745.webp",
  "https://down-id.img.susercontent.com/file/sg-11134201-7rfhp-ma0tf92pm15ob2.webp",
  "https://down-id.img.susercontent.com/file/id-11134207-7rbke-m9iaj3o6mcuq85.webp",
  "https://down-id.img.susercontent.com/file/id-11134207-7rbk0-m9kzwfe82wppe7.webp",
  "https://down-id.img.susercontent.com/file/id-11134207-7rbk7-m9jvfm3wku9f00.webp",
  "https://down-id.img.susercontent.com/file/id-11134207-8224o-micgpmtkv94y04.webp",
  "https://down-id.img.susercontent.com/file/id-11134207-8224o-micgpmtkv94y04.webp",
  "https://down-id.img.susercontent.com/file/id-11134207-8224o-micgpmtkv94y04.webp",
  "https://down-id.img.susercontent.com/file/id-11134207-8224o-micgpmtkv94y04.webp",
];

const colors = [
  "Brown",
  "Brown",
  "Yellow",
  "Red",
  "Brown",
  "Purple",
  "Blue",
  "Brown",
  "Brown",
  "Yellow",
  "Red",
  "Brown",
  "Purple",
  "Blue",
  "Brown",
  "Brown",
  "Yellow",
  "Red",
  "Brown",
  "Purple",
  "Blue",
  "Brown",
  "Brown",
  "Yellow",
  "Red",
  "Brown",
  "Purple",
  "Blue",
  "Brown",
  "Brown",
  "Yellow",
  "Red",
  "Brown",
  "Purple",
  "Blue",
];

const productDesc = `<p>Dompet Pouch Mini Nylon Waterproof &ndash; Ringkas, Aman &amp; Multifungsi Lengkapi kebutuhan harian Anda di tahun 2025 dengan dompet pouch mini yang tangguh dan praktis. Menggunakan material Nylon Waterproof, dompet ini dirancang khusus untuk menjaga barang-barang esensial Anda tetap aman dan terorganisir dalam ukuran yang sangat ringkas. Keunggulan Utama:</p>
<ul>
<li>Material Tahan Air (Waterproof): Terbuat dari bahan nilon berkualitas yang mampu menahan cipratan air, sehingga uang, kartu, dan barang berharga di dalamnya tetap kering.</li>
<li>Sistem Organisasi 3 Ruang: Meski ukurannya mungil, dompet ini memiliki 2 ruang utama beresleting dan 1 ruang depan, memudahkan Anda memisahkan uang kertas, koin, serta kunci agar tidak tercampur.</li>
<li>Hardware Anti Karat: Menggunakan kepala resleting berkualitas tinggi yang anti karat, menjamin penggunaan jangka panjang yang tetap lancar dan awet.</li>
<li>Desain 2-Way Carry: Dilengkapi dengan tali pendek (tali tangan) yang bisa dilepas pasang. Anda bisa menggunakannya sebagai dompet genggam (hand pouch) atau memasukkannya ke dalam tas besar sebagai organizer.</li>
<li>Super Ringan: Dengan berat hanya 65 gram, dompet ini sangat ringan dan nyaman dibawa tanpa membebani saku atau tas Anda.</li>
</ul>
<p>Spesifikasi Produk:</p>
<ul>
<li>Bahan: Nylon Waterproof (Tahan Air).</li>
<li>Sistem Penyimpanan:
<ul>
<li>2 Ruang Utama (Resleting).</li>
<li>1 Ruang Dalam Tanpa Penutup (Di dalam ruang utama).</li>
<li>1 Ruang Depan (Resleting).</li>
</ul>
</li>
<li>Fitur Khusus: Kepala resleting anti karat &amp; Tali tangan detachable.</li>
<li>Dimensi: Panjang 13 cm x Lebar 3.5 cm x Tinggi 10 cm.</li>
<li>Berat: 65 gram.</li>
</ul>
<p>Kegunaan &amp; Fungsi:</p>
<ol>
<li>Daily Wallet: Sangat praktis untuk membawa uang tunai dan kartu saat berbelanja ke minimarket atau berolahraga ringan.</li>
<li>Organizer Barang Kecil: Ideal untuk menyimpan, kabel data, kunci kendaraan, atau perintilan pribadi agar mudah ditemukan.</li>
<li>Tempat Kartu &amp; Koin: Memudahkan Anda memisahkan kartu dan uang koin di kompartemen yang berbeda.</li>
<li>Travel Pouch: Teman setia saat bepergian untuk menyimpan mata uang asing atau tiket kecil secara rapi.</li>
</ol>`;

const VISIBLE_THUMBS = 8;

export default function ProductDetailPage() {
  useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(2);
  const [thumbStart, setThumbStart] = useState(0);

  const prevImage = () => {
    setSelectedImage((p) => (p > 0 ? p - 1 : 0));
  };
  const nextImage = () =>
    setSelectedImage((p) =>
      p < productImages.length - 1 ? p + 1 : productImages.length - 1,
    );

  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);

  const averageRating =
    reviewDataTemp.reduce((acc, r) => acc + r.rating, 0) /
    reviewDataTemp.length;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviewDataTemp.filter((r) => Math.round(r.rating) === star).length,
  }));
  const maxRatingCount = Math.max(...ratingCounts.map((r) => r.count));
  const formatCount = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

  return (
    <BasePage>
      <Breadcrumbs className="my-10 text-gray-500">
        <BreadcrumbsItem>
          <Link to="/">Home</Link>
        </BreadcrumbsItem>
        <BreadcrumbsItem>
          <Link to="/products">Products</Link>
        </BreadcrumbsItem>
        <BreadcrumbsItem>PIOMA Lussie Dompet Handphone</BreadcrumbsItem>
      </Breadcrumbs>
      <div className="mx-20 flex flex-col gap-10">
        <div className="flex gap-10">
          {/* ── Left: Image Gallery ── */}
          <div className="shrink-0 w-2/3 flex flex-col gap-3 ">
            {/* Main image */}
            <div className="relative border-2 border-blue-400 rounded-md bg-white h-150 flex items-center justify-center overflow-hidden">
              <img
                src={productImages[selectedImage]}
                alt="product"
                className="object-contain h-full w-full p-4"
              />
            </div>
          </div>

          {/* ── Right: Product Info ── */}
          <div className="flex-1 flex flex-col gap-5 pt-1">
            {/* Title */}
            <h1 className="text-xl text-left font-semibold text-gray-800 leading-snug">
              PIOMA Lussie Dompet Handphone Wanita 1 Resleting Bahan Nylon
              Waterproof
            </h1>

            {/* Price */}
            <p className="text-lg text-left font-medium text-gray-800">
              Rp. 26.999
            </p>

            {/* Divider */}
            <hr className="border-gray-200" />

            {/* Colours */}
            <div className="flex items-start gap-4">
              <span className="text-gray-600 text-sm mt-1 whitespace-nowrap font-medium">
                Colours:
              </span>
              <div className="flex flex-wrap gap-2">
                {colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className={`px-3 py-1 rounded border text-sm transition-colors ${
                      selectedColor === i
                        ? "border-gray-800 bg-gray-100 font-medium"
                        : "border-gray-300 text-gray-600 hover:border-gray-500"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-black text-white py-3 rounded-full font-medium text-sm hover:bg-gray-900 transition-colors">
              Add to Cart
            </button>

            {/* Favourite */}
            <button className="w-full border border-gray-300 py-3 rounded-full font-medium text-sm text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              Favourite
              <FontAwesomeIcon icon={faHeart} className="text-gray-400" />
            </button>

            {/* Quantity + Buy Now + Cart */}
            <div className="flex items-center gap-3">
              {/* Quantity stepper */}
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <FontAwesomeIcon icon={faMinus} className="text-xs" />
                </button>
                <span className="px-5 py-2 border-x border-gray-300 text-sm min-w-10 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <FontAwesomeIcon icon={faPlus} className="text-xs" />
                </button>
              </div>

              {/* Buy Now */}
              <button className="flex-1 bg-[#7B5B1E] text-white py-2 rounded-md font-medium text-sm hover:bg-[#694f18] transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        </div>
        {/* Thumbnails row */}
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              prevImage();
              setThumbStart((p) => Math.max(0, p - 1));
            }}
            className="shrink-0 bg-white border border-gray-300 rounded-full w-7 h-7 flex items-center justify-center shadow hover:bg-gray-50"
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-xs text-gray-600"
            />
          </Button>

          <div className="flex gap-2 flex-1 overflow-hidden mt-5">
            {productImages
              .slice(thumbStart, thumbStart + VISIBLE_THUMBS)
              .map((img, i) => {
                const idx = thumbStart + i;
                return (
                  <Button
                    onHoverChange={() => setSelectedImage(idx)}
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-1 h-32 border-2 rounded bg-transparent overflow-hidden shrink-0 ${
                      selectedImage === idx
                        ? "border-blue-400"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </Button>
                );
              })}
          </div>

          <Button
            onClick={() => {
              nextImage();
              setThumbStart((p) =>
                Math.min(productImages.length - VISIBLE_THUMBS, p + 1),
              );
            }}
            className="shrink-0 bg-white border border-gray-300 rounded-full w-7 h-7 flex items-center justify-center shadow hover:bg-gray-50"
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              className="text-xs text-gray-600"
            />
          </Button>
        </div>

        <Accordion allowsMultipleExpanded className="w-full">
          <AccordionItem key="Deskripsi Produk" className="bg-gray-50 mb-10">
            <Accordion.Heading>
              <Accordion.Trigger className="text-2xl pb-5">
                Deskripsi Produk
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body className="border-t border-gray-200">
                <div
                  className="mt-5 prose text-left text-lg prose-sm max-w-none pb-4 text-gray-700 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 [&_p]:mb-2"
                  dangerouslySetInnerHTML={{ __html: productDesc }}
                />
              </Accordion.Body>
            </Accordion.Panel>
          </AccordionItem>
          <AccordionItem key="Review" className="bg-gray-50">
            <Accordion.Heading>
              <Accordion.Trigger className="text-2xl">
                Reviews
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body className="text-left border-t border-gray-200 text-black">
                <div className="flex gap-0 items-center py-6 border-b border-gray-200">
                  {/* Total Reviews */}
                  <div className="flex-1 border-r border-gray-200 pr-8">
                    <p className="text-sm text-gray-500">Total Reviews</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-2xl font-bold">
                        {formatCount(reviewDataTemp.length)}
                      </p>
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                        21% ↑
                      </span>
                    </div>
                  </div>

                  {/* Average Rating */}
                  <div className="flex-1 border-r border-gray-200 px-8">
                    <p className="text-sm text-gray-500">Average Rating</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-2xl font-bold">
                        {averageRating.toFixed(1)}
                      </p>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <FontAwesomeIcon
                            key={s}
                            icon={faStar}
                            className={
                              s <= Math.round(averageRating)
                                ? "text-yellow-400"
                                : "text-gray-200"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Rating Bars */}
                  <div className="flex-1 pl-8">
                    {ratingCounts.map(({ star, count }) => (
                      <div
                        key={star}
                        className="flex items-center gap-2 mb-1.5"
                      >
                        <span className="text-xs text-gray-500 w-3">
                          {star}
                        </span>
                        <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              star >= 4 ? "bg-teal-400" : "bg-orange-400"
                            }`}
                            style={{
                              width: `${maxRatingCount > 0 ? (count / maxRatingCount) * 100 : 0}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 w-8 text-right">
                          {formatCount(count)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  {reviewDataTemp.map((r) => (
                    <div key={r.id} className="py-4 border-b border-gray-200">
                      <p className="text-sm text-gray-500">{r.nama_orang}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-2xl font-bold">{r.rating}</p>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <FontAwesomeIcon
                              key={s}
                              icon={faStar}
                              className={
                                s <= Math.round(r.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-200"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mt-2">{r.comment}</p>
                    </div>
                  ))}
                </div>
              </Accordion.Body>
            </Accordion.Panel>
          </AccordionItem>
        </Accordion>

        <div className="flex flex-col text-left">
          <p className="text-left cardTitle">You Might Also Like</p>
          <CardSlider />
        </div>
      </div>
    </BasePage>
  );
}
