export interface Review {
  id: number;
  rating: number;
  comment: string;
  author: string;
  date: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: 'Tops' | 'Bottoms' | 'Dresses' | 'Outerwear' | 'Footwear' | 'Accessories';
  gender: 'Men' | 'Women' | 'Unisex';
  sizes: string[];
  colors: string[];
  reviews: Review[];
  inventory: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export type WishlistItem = number; // Storing product IDs
