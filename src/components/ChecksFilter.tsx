import React, { useContext, useState } from 'react';
import SearchContext from '../contexts/SearchContext';

export const ChecksFilter = () => {
  const { filters, setFilters } = useContext(SearchContext);

  const onFilterChange = (event) => {
    const value = event.target.value;
    setFilters(value);
  };
  return (
    <div className="field">
      <label className="label">Name</label>
      <div className="control">
        <input
          type="text"
          className="input"
          placeholder="Enter Filters"
          value={filters}
          onChange={onFilterChange}
        />
      </div>
    </div>
  );
};
