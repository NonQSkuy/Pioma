export interface Product {
  id: number;
  foto_produk: string;
  nama_produk: string;
  harga: number;
  harga_setelah_discount: number;
  discount: number;
  rating: number;
  jumlah_terjual: number;
  warna?: string;
  colors?: string[];
  tags?: string[];
}

