'use client';

import useSearchContext from '@/hooks/use-search-context';
import { Input } from './ui/input';

export default function SearchForm() {
  const { searchQuery, handleSearchQuery } = useSearchContext();

  return (
    <form className="h-full w-full">
      <Input
        value={searchQuery}
        className="bg-white"
        onChange={(e) => handleSearchQuery(e.target.value)}
        type="search"
        placeholder="Search pets"
      />
    </form>
  );
}
