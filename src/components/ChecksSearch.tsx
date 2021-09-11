import React from 'react';
import { ChecksFilter } from './ChecksFilter';
import NamespaceSelector from './NamespaceSelector';

export const ChecksSearch = () => {
  return (
    <div className="field is-horizontal">
      <NamespaceSelector />
      <ChecksFilter />
    </div>
  );
};
