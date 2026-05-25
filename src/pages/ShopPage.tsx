import { useMemo, useState } from "react";
import { categories } from "@/data/products";
import type { Product, ProductCategory } from "@/types/product";
import { FilterSidebar, type SortOption } from "@/components/product/FilterSidebar";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SearchBar } from "@/components/ui/SearchBar";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface ShopPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  navigate: (to: string) => void;
}

function sortProducts(items: Product[], sort: SortOption) {
  const sorted = [...items];
  if (sort === "price-low") return sorted.sort((a, b) => a.price - b.price);
  if (sort === "price-high") return sorted.sort((a, b) => b.price - a.price);
  if (sort === "rating") return sorted.sort((a, b) => b.rating - a.rating);
  return sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
}

export function ShopPage({ products, onAddToCart, navigate }: ShopPageProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "All">("All");
  const [sort, setSort] = useState<SortOption>("featured");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const searchable = [
        product.name,
        product.category,
        product.family,
        product.description,
        ...product.notes.top,
        ...product.notes.heart,
        ...product.notes.base,
      ]
        .join(" ")
        .toLowerCase();
      return matchesCategory && searchable.includes(normalizedQuery);
    });

    return sortProducts(filtered, sort);
  }, [products, query, selectedCategory, sort]);

  return (
    <main className="bg-[#F7F3EE] px-5 pb-24 pt-32 md:px-10 md:pb-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 border-b border-[#0B0B0B]/10 pb-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <SectionHeader
            copy="Filter by family, search by note, and sort the house collection without losing the editorial calm."
            eyebrow="Shop VELORA"
            title="A catalog of quiet power."
          />
          <SearchBar onChange={setQuery} value={query} />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[18rem_1fr]">
          <FilterSidebar
            categories={categories}
            onCategoryChange={setSelectedCategory}
            onSortChange={setSort}
            selectedCategory={selectedCategory}
            sort={sort}
          />
          <div>
            <div className="mb-8 flex items-center justify-between gap-6 text-xs uppercase tracking-[0.24em] text-[#1A1A1A]/50">
              <p>{filteredProducts.length} fragrances</p>
              <p>{selectedCategory === "All" ? "All families" : selectedCategory}</p>
            </div>
            <ProductGrid navigate={navigate} onAddToCart={onAddToCart} products={filteredProducts} />
          </div>
        </div>
      </div>
    </main>
  );
}
