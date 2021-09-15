import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import SearchContext from '../contexts/SearchContext';

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

const NamespaceSelector = ({ onSelect }: any) => {
  const { loading, error, data } = useQuery(query);
  const { namespace, setNamespace } = useContext(SearchContext);

  const selectNamespace = (event: any) => {
    const namespace = event.target.value;
    setNamespace(namespace);
  };

  let opts: React.ReactNode[];
  if (loading) {
    opts = [
      <option key="0" value="">
        --Querying namespaces--
      </option>,
    ];
  } else if (error) {
    console.trace(error);
    opts = [
      <option key="0" value="">
        --Error querying namespaces--
      </option>,
    ];
  } else {
    opts = [
      <option key="placeholder" value="">
        --Please choose a namespace--
      </option>,
      ...data.viewer?.namespaces.map((namespace: Named, index) => (
        <option key={`${index}`}>{namespace.name}</option>
      )),
    ];
  }
  return (
    <div className="field">
      <label className="label">Namespace</label>
      <div className="control">
        <div className="select">
          <select
            value={namespace}
            onChange={(event) => selectNamespace(event)}
          >
            {opts}
          </select>
        </div>
      </div>
    </div>
  );
};

export default NamespaceSelector;
