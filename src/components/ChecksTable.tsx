import React, { useContext, useState } from 'react';
import SearchContext from '../contexts/SearchContext';

const SortableColumn = ({ column }) => {
  const [sortDirection, setSortDirection] = useState('');
  const { updateOrdering } = useContext(SearchContext);

  const sortColumn = () => {
    updateOrdering(column.key);
  };
  return (
    <th style={{ cursor: 'pointer' }} onClick={sortColumn}>
      {column.label}
    </th>
  );
};

const TableCell = ({ data, column }) => {
  const { actionClicked } = useContext(SearchContext);
  const onActionClick = () => {
    actionClicked(column.key, data);
  };
  switch (column.type) {
    case 'list':
      return <td>{data[column.key].join(', ')}</td>;
    case 'action':
      return (
        <td>
          <a onClick={onActionClick}>Delete</a>
        </td>
      );
    default:
      return <td>{getNestedData(data, column.key)}</td>;
  }
};

const getNestedData = (initialData = {}, path = '') => {
  let data = initialData;
  path.split('.').forEach((segment) => {
    data = data[segment];
  });
  return data;
};

export const ChecksTable = ({
  checks,
  fetchMore,
  loading,
  pageInfo = {},
}: any) => {
  const columns = [
    {
      label: 'Name',
      key: 'metadata.name',
      isSortable: true,
    },
    {
      label: 'Interval',
      key: 'interval',
    },
    {
      label: 'Subscriptions',
      key: 'subscriptions',
      type: 'list',
    },
    {
      label: 'Command',
      key: 'command',
    },
    {
      label: 'Delete',
      key: 'delete',
      type: 'action',
    },
  ];
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => {
            return column.isSortable ? (
              <SortableColumn key={column.key} column={column} />
            ) : (
              <th key={column.key}>{column.label}</th>
            );
          })}
        </tr>
      </thead>
      <tfoot>
        <tr>
          {checks.length && pageInfo.nextOffset > 0 ? (
            <th colSpan={columns.length}>
              <a onClick={fetchMore}>Fetch More</a>
            </th>
          ) : null}
        </tr>
      </tfoot>
      <tbody>
        {checks.length ? (
          checks.map((check, index) => {
            return (
              <tr key={index}>
                {columns.map((column) => {
                  return (
                    <TableCell
                      key={`${column.key}-${index}`}
                      data={check}
                      column={column}
                    />
                  );
                })}
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={columns.length}>No checks found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
