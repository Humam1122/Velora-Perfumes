import { SlidersHorizontal } from "lucide-react";
import type { ProductCategory } from "@/types/product";
import { cn } from "@/utils/cn";

export type SortOption = "featured" | "price-low" | "price-high" | "rating";

interface FilterSidebarProps {
  categories: ProductCategory[];
  selectedCategory: ProductCategory | "All";
  sort: SortOption;
  onCategoryChange: (category: ProductCategory | "All") => void;
  onSortChange: (sort: SortOption) => void;
}

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Featured", value: "featured" },
  { label: "Price low", value: "price-low" },
  { label: "Price high", value: "price-high" },
  { label: "Highest rated", value: "rating" },
];

export function FilterSidebar({ categories, selectedCategory, sort, onCategoryChange, onSortChange }: FilterSidebarProps) {
  return (
    <aside className="space-y-10 lg:sticky lg:top-28 lg:self-start">
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-[#0B0B0B]/60">
        <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
        Refine
      </div>

      <div>
        <p className="mb-4 font-serif text-2xl tracking-[-0.03em] text-[#0B0B0B]">Fragrance family</p>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
          {["All", ...categories].map((category) => (
            <button
              className={cn(
                "border border-[#0B0B0B]/10 px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-[#0B0B0B]/55 transition hover:border-[#C6A56B] hover:text-[#0B0B0B]",
                selectedCategory === category && "border-[#C6A56B] bg-[#C6A56B]/10 text-[#0B0B0B]",
              )}
              key={category}
              onClick={() => onCategoryChange(category as ProductCategory | "All")}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <label className="block">
        <span className="mb-4 block font-serif text-2xl tracking-[-0.03em] text-[#0B0B0B]">Sort by</span>
        <select
          className="w-full border border-[#0B0B0B]/15 bg-transparent px-4 py-4 text-xs uppercase tracking-[0.18em] text-[#0B0B0B] outline-none transition focus:border-[#C6A56B]"
          onChange={(event) => onSortChange(event.target.value as SortOption)}
          value={sort}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </aside>
  );
}
