import React from 'react';

const Filter = ({ searchTerm, onSearchChange }) => {
    return (
      <div>
        Filter shown with: <input value={searchTerm} onChange={onSearchChange} />
      </div>
    );
  };
  
  export default Filter;
  