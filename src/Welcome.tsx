import React from "react";
import { useQuery, gql } from "@apollo/client";

// As an example: query version & build date from service
const query = gql`
  query WelcomeQuery {
    versions {
      backend {
        version
        buildDate
      }
    }
  }
`;

// NOTE: Feel free to delete me at your lesuire
function Welcome() {
  const { loading, error, data } = useQuery(query);

  let message: React.ReactNode;
  if (error) {
    console.error("error while querying GraphQL service", error);
    message = (
      <>
        unable to connect to Sensu cluster: <em>{error.message}</em>
      </>
    );
  } else if (!loading && data) {
    const date = new Date(data.versions.backend.buildDate);
    message = (
      <>
        connected to cluster running{" "}
        <em>
          {data.versions.backend.version} ({date.toLocaleDateString()})
        </em>
      </>
    );
  }

  return (
    <>
      <p>
        <ul>
          <li>reticulating splines...</li>
          <li>calculating llama expectoration trajectory...</li>
          <li>connecting to Sensu cluster...</li>
          <li>{message}</li>
        </ul>
      </p>

      <p>
        <a href="/graphiql" target="_blank" rel="noopener noreferrer">
          GraphiQL
        </a>
        {" · "}
        <a
          href="https://github.com/apollographql/apollo-client-devtools#installation"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apollo Dev Tools
        </a>
      </p>
    </>
  );
}

export default Welcome;
