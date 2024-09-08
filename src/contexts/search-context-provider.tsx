'use client';

import { createContext, useState } from 'react';

type TSearchContext = {
  searchQuery: string;
  handleSearchQuery: (query: string) => void;
};

export const SearchContext = createContext<TSearchContext | null>(null);

export default function SearchContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // state
  const [searchQuery, setSearchQuery] = useState('');

  // handlers
  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, handleSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
}
