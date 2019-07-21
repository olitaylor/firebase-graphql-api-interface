import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-fetch'

export const client = new ApolloClient({
  uri: 'https://us-central1-graphql-api-3d27c.cloudfunctions.net/products',
  fetch,
})