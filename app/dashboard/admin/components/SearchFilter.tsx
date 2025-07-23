'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Search, Filter, X } from 'lucide-react';

interface FilterOption {
  key: string;
  label: string;
  type: 'select' | 'input' | 'date';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: Record<string, string>) => void;
  filterOptions?: FilterOption[];
  searchPlaceholder?: string;
}

export default function SearchFilter({
  onSearch,
  onFilter,
  filterOptions = [],
  searchPlaceholder = "Cari..."
}: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
    onSearch('');
    onFilter({});
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '') || searchQuery !== '';

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Search and basic filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Quick Filters */}
              {filterOptions.slice(0, 3).map((option) => (
                <div key={option.key}>
                  {option.type === 'select' && (
                    <select
                      value={filters[option.key] || ''}
                      onChange={(e) => handleFilterChange(option.key, e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">{option.label}</option>
                      {option.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters} size="sm">
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
              {filterOptions.length > 3 && (
                <Button
                  variant="outline"
                  onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {showAdvancedFilter ? 'Hide' : 'Advanced'} Filter
                </Button>
              )}
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilter && filterOptions.length > 3 && (
            <div className="pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filterOptions.slice(3).map((option) => (
                  <div key={option.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {option.label}
                    </label>
                    {option.type === 'select' && (
                      <select
                        value={filters[option.key] || ''}
                        onChange={(e) => handleFilterChange(option.key, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Semua</option>
                        {option.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    )}
                    {option.type === 'input' && (
                      <input
                        type="text"
                        placeholder={option.placeholder}
                        value={filters[option.key] || ''}
                        onChange={(e) => handleFilterChange(option.key, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    )}
                    {option.type === 'date' && (
                      <input
                        type="date"
                        value={filters[option.key] || ''}
                        onChange={(e) => handleFilterChange(option.key, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
