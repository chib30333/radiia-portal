import { searches } from "../components/Constant";
import SavedSearchCard from "../components/SavedSearchCard";

export function SavedSearchesPageView() {
  return (
    <div>
      <div className="border-b border-[#f0ede7] p-6 md:pt-12 xl:pt-6 lg:px-12 mx-auto  px-6 sm:px-6">
        <div className="mx-auto flex  items-end justify-between gap-4">
          <h1 className="font-display text-4xl font-normal tracking-[0.04em] text-[#050a30]">Saved Searches</h1>
          <span className="text-sm text-[#aaa]">{searches.length} saved searches</span>
        </div>
      </div>
      <div className="bg-[#fafaf8] px-6 py-6 lg:px-12 lg:py-8">
        <div className="mx-auto  space-y-4">
          {searches.map((search) => (
            <SavedSearchCard key={search.id} search={search} />
          ))}
        </div>
      </div>
    </div>
  );
}
