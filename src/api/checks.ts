import { gql } from '@apollo/client';
import apolloClient from './apollo';

export const LOAD_CHECKS = gql`
  query ChecksQuery(
    $namespace: String!
    $filters: [String!]
    $orderBy: CheckListOrder
    $limit: Int = 10
    $offset: Int = 0
  ) {
    namespace(name: $namespace) {
      name
      checks(
        filters: $filters
        orderBy: $orderBy
        limit: $limit
        offset: $offset
      ) {
        nodes {
          id
          proxyEntityName
          command
          interval
          metadata {
            name
            cluster
            labels {
              key
              val
            }
          }
          subscriptions
        }
        pageInfo {
          nextOffset
          previousOffset
        }
      }
    }
  }
`;

export const DELETE_CHECK_MUTATION = gql`
  mutation ($input: DeleteRecordInput!) {
    deleteCheck(input: $input) {
      deletedId
    }
  }
`;

export const deleteCheck = async (check, namespace) => {
  const response = await apolloClient.mutate({
    mutation: DELETE_CHECK_MUTATION,
    variables: { input: { id: check.id } },
    update: (cache, { data }) => {
      // Weird but couldn't query checks from the cache here.. "checks" not found on namespace object
      apolloClient.resetStore().then((response) => {
        console.log(response, data, cache);
        cache.writeQuery({ query: LOAD_CHECKS, data: null });
      });
    },
  });
  return response;
};
