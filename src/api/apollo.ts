import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const createAuthLink = () =>
  setContext((_, { headers }) => {
    const apikey = process.env.REACT_APP_KEY;
    if (!apikey) {
      console.warn(`
        it does not appear as if the environment variable SENSU_API_KEY is set,
        this may hinder your ability to communicate with the Sensu GraphQL service.
      `);
    }

    return {
      headers: {
        ...headers,
        authorization: `Key ${apikey}`,
      },
    };
  });

const createClient = () => {
  // NOTE: the backend doesn't support CORS
  //
  // const url = process.env.REACT_APP_API;
  // if (!url) {
  //   console.warn(`
  //     it does not appear as if the environment variable SENSU_API_URL is set,
  //     this may hinder your ability to communicate with the Sensu GraphQL service.
  //   `);
  // }
  //

  const authLink = createAuthLink();
  const httpLink = createHttpLink({ uri: '/graphql' });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({}),
  });
};

const apolloClient = createClient();

export default apolloClient;
