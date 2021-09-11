import React, { useState } from 'react';
import { deleteCheck } from '../api/checks';

const Context = React.createContext<any>({ namespace: '' });

export const SearchStore = (props: any) => {
  const [namespace, setNamespace] = useState('');
  const [filters, setFilters] = useState([]);
  const [ordering, setOrdering] = useState('NAME');
  const [notification, setNotification] = useState('');

  const updateOrdering = () => {
    const updatedOrdering = ordering === 'NAME' ? 'NAME_DESC' : 'NAME';
    setOrdering(updatedOrdering);
  };

  const actionClicked = (action, check) => {
    switch (action) {
      case 'delete':
        let confirmed = window.confirm(
          `Do you want to delete this check ${check.id}`
        );
        if (confirmed) {
          deleteCheck(check, namespace);
          setNotification(`Deleted check ${check.id}`);
        }
        break;
    }
  };

  return (
    <Context.Provider
      value={{
        namespace,
        setNamespace,
        filters,
        setFilters,
        ordering,
        updateOrdering,
        actionClicked,
        notification,
        setNotification,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
