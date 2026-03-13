import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-lg mx-auto mb-10 animate-fade-in px-4 md:px-0"
    >
      <div className="relative glass-input-container group shadow-2xl">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="glass-input pl-6 pr-16"
          disabled={isLoading}
        />
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-icon"
          >
            <Search size={18} className={isLoading ? 'animate-spin-slow' : ''} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
