import { useState, useCallback } from 'react';

export function useSearch(data = [], fields = []) {
  const [search, setSearch] = useState('');

  const filteredData = data.filter(item => {
    if (!search.trim()) return true;

    const keyword = search.toLowerCase();
    return fields.some(field => {

      const value = field.split('.').reduce((obj, key) => obj?.[key], item);
      return value && String(value).toLowerCase().includes(keyword);
    });
  });

  const clearSearch = useCallback(() => setSearch(''), []);

  return { search, setSearch, filteredData, clearSearch };
}
