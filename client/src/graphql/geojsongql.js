import gql from "graphql-tag";
export const GEOJSON_LOCAL_QUERY = gql `
  query Geojson  {
    geojson @client {
      features
      type
      key
    }
  }
`;