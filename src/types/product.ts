export type ProductCategory = "Oud" | "Floral" | "Woody" | "Fresh" | "Oriental" | "Musk";

export type StockStatus = "In Stock" | "Low Stock" | "Sold Out";

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  volume: string;
  description: string;
  details: string;
  category: ProductCategory;
  family: string;
  longevity: string;
  notes: FragranceNotes;
  occasion: string[];
  mainImage: string;
  galleryImages: string[];
  rating: number;
  reviewsCount: number;
  featured: boolean;
  bestSeller: boolean;
  stockStatus: StockStatus;
  ingredients: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
