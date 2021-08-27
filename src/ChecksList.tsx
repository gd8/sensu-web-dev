import React from "react";
import { useQuery, gql } from "@apollo/client";

// Hardcoded until the switcher is in place
const namespace = "development";

// Query checks within the given namespace
const query = gql`
  query ChecksQuery($namespace: String!) {
    namespace(name: $namespace) {
      name
      # implement me!
    }
  }
`;

function ChecksList() {
  const variables = { namespace };
  const { loading, error } = useQuery(query, { variables });

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return (
      <p>
        Error querying checks: <em>{error.message}</em>
      </p>
    );
  }

  // TODO: implement me!
  return null;
}

export default ChecksList;
