import React, { createContext, useState, useContext } from 'react';
import { GitHubUser } from '../../types';

interface SearchContextProps {
  users: GitHubUser[];
  setUsers: (users: GitHubUser[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  totalCount: number;
  setTotalCount: (totalCount: number) => void;
  page: number;
  setPage: (page: number) => void;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <SearchContext.Provider value={{ users, setUsers, isLoading, setIsLoading, totalCount, setTotalCount, page, setPage, searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
