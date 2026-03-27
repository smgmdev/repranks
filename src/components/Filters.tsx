"use client";

import { industries, countries } from "@/data/companies";

type Props = {
  search: string;
  onSearchChange: (v: string) => void;
  industry: string;
  onIndustryChange: (v: string) => void;
  country: string;
  onCountryChange: (v: string) => void;
};

export default function Filters({
  search,
  onSearchChange,
  industry,
  onIndustryChange,
  country,
  onCountryChange,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1 max-w-sm">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="SEARCH BY NAME"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-[#979797] rounded-lg text-sm tracking-wide focus:outline-none focus:border-[#181716] transition-colors"
        />
      </div>
      <select
        value={industry}
        onChange={(e) => onIndustryChange(e.target.value)}
        className="min-w-[220px] px-6 pr-10 py-2.5 border border-[#979797] rounded-lg text-sm bg-white cursor-pointer focus:outline-none focus:border-[#181716] transition-colors appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center]"
      >
        <option value="">ALL INDUSTRIES</option>
        {industries.map((ind) => (
          <option key={ind} value={ind}>
            {ind.toUpperCase()}
          </option>
        ))}
      </select>
      <select
        value={country}
        onChange={(e) => onCountryChange(e.target.value)}
        className="min-w-[220px] px-6 pr-10 py-2.5 border border-[#979797] rounded-lg text-sm bg-white cursor-pointer focus:outline-none focus:border-[#181716] transition-colors appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center]"
      >
        <option value="">ALL COUNTRIES</option>
        {countries.map((c) => (
          <option key={c} value={c}>
            {c.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
