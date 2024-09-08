'use client';

import useSearchContext from '@/hooks/use-search-context';

export default function SearchForm() {
  const { searchQuery, handleSearchQuery } = useSearchContext();

  return (
    <form className="h-full w-full">
      <input
        value={searchQuery}
        onChange={(e) => handleSearchQuery(e.target.value)}
        className="h-full w-full rounded bg-primary/10 px-4 outline-none transition placeholder:text-muted-foreground focus:border focus:border-primary/50"
        type="search"
        placeholder="Search pets"
      />
    </form>
  );
}
