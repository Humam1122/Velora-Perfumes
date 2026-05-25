import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="group flex w-full items-center gap-3 border-b border-[#0B0B0B]/20 py-4 transition-colors focus-within:border-[#C6A56B]">
      <Search aria-hidden="true" className="h-5 w-5 text-[#0B0B0B]/45 transition-colors group-focus-within:text-[#C6A56B]" />
      <span className="sr-only">Search fragrances</span>
      <input
        className="w-full bg-transparent text-sm uppercase tracking-[0.18em] text-[#0B0B0B] outline-none placeholder:text-[#0B0B0B]/35"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by scent, note, mood"
        type="search"
        value={value}
      />
    </label>
  );
}
