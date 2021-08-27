import React from "react";
import { useQuery, gql } from "@apollo/client";

const pollInterval = 5000;

// Query all namespaces the authorized user has access to
const query = gql`
  query NamespacesQuery {
    viewer {
      namespaces {
        name
      }
    }
  }
`;

interface Named {
  name: string;
}

const NamespaceSelector = () => {
  const { loading, error, data } = useQuery(query, { pollInterval });

  let opts: React.ReactNode[];
  if (loading) {
    opts = [<option value="">--Querying namespaces--</option>];
  } else if (error) {
    console.trace(error);
    opts = [<option value="">--Error querying namespaces--</option>];
  } else {
    opts = [
      <option value="">--Please choose a namespace--</option>,
      ...data.viewer?.namespaces.map((namespace: Named) => (
        <option>{namespace.name}</option>
      )),
    ];
  }
  return <select>{opts}</select>;
};

export default NamespaceSelector;
