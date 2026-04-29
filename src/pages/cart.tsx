import { useState } from "react";
import {
  Checkbox,
  CheckboxGroup,
  CheckboxControl,
  CheckboxIndicator,
  CheckboxContent,
} from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { BasePage } from "./_components/_base";

type CartItem = {
  id: string;
  name: string;
  color: string;
  price: number;
  qty: number;
  image: string;
};

const initialItems: CartItem[] = [
  {
    id: "1",
    name: "PIOMA Lussie Dompet Handphone Wanita 1 Resleti...",
    color: "White",
    price: 160000,
    qty: 1,
    image:
      "https://down-id.img.susercontent.com/file/id-11134207-8224o-micgpmtkv94y04.webp",
  },
  {
    id: "2",
    name: "PIOMA Lussie Dompet Handphone Wanita 1 Resleti...",
    color: "White",
    price: 160000,
    qty: 1,
    image:
      "https://down-id.img.susercontent.com/file/id-11134207-8224o-micgpmtkv94y04.webp",
  },
  {
    id: "3",
    name: "PIOMA Lussie Dompet Handphone Wanita 1 Resleti...",
    color: "White",
    price: 160000,
    qty: 1,
    image:
      "https://down-id.img.susercontent.com/file/id-11134207-8224o-micgpmtkv94y04.webp",
  },
];

function formatRp(n: number) {
  return "Rp. " + n.toLocaleString("id-ID");
}

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [selected, setSelected] = useState<string[]>(["1", "3"]);

  const updateQty = (id: string, delta: number) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item,
      ),
    );

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  const selectedItems = items.filter((item) => selected.includes(item.id));
  const subtotal = selectedItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  return (
    <BasePage>
      <div className="flex gap-10 min-h-screen py-10 items-start">
        {/* ── Left: Cart list ── */}
        <div className="flex-1">
          {/* Header row */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Shopping Cart
            </h1>
            <span className="text-sm text-gray-400">
              {items.length} item{items.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <div className="flex">
            
        </div>

        
      </div>
    </BasePage>
  );
}
