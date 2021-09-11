import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import SearchContext from '../contexts/SearchContext';
import { ChecksTable } from './ChecksTable';
import { LOAD_CHECKS } from '../api/checks';
import { filterChecks } from '../utils/filterChecks';

function ChecksList() {
  const { namespace, filters, ordering, setFilters } =
    useContext(SearchContext);
  const { loading, error, data, fetchMore } = useQuery(LOAD_CHECKS, {
    variables: { namespace, offset: 0, orderBy: ordering },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });
  let checks = data?.namespace?.checks?.nodes || [];
  let pageInfo = data?.namespace?.checks?.pageInfo || {};

  const fetchMoreChecks = () => {
    setFilters('');
    fetchMore({
      variables: { namespace, offset: checks.length },
      updateQuery: (currentResult: any, { fetchMoreResult }: any) => {
        const currentNamespace = currentResult?.namespace || {};
        const incomingNamespace = fetchMoreResult?.namespace || {};
        const currentChecksNodes =
          currentResult?.namespace?.checks?.nodes || [];
        const incomingChecksNodes =
          fetchMoreResult?.namespace.checks?.nodes || [];
        return {
          namespace: {
            ...currentNamespace,
            ...incomingNamespace,
            checks: {
              nodes: [...currentChecksNodes, ...incomingChecksNodes],
              pageInfo: incomingNamespace.checks?.pageInfo,
            },
          },
        };
      },
    });
  };

  if (error) {
    return (
      <p>
        Error querying checks: <em>{error.message}</em>
      </p>
    );
  }

  if (filters) {
    checks = filterChecks(checks, filters);
  }

  return (
    <ChecksTable
      checks={checks}
      fetchMore={fetchMoreChecks}
      loading={loading}
      pageInfo={pageInfo}
    />
  );
}

export default ChecksList;
