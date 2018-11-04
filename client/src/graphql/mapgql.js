import gql from "graphql-tag";
export const GET_MAP_POSITION = gql`
  query MapPosition {
    mapPosition @client {
      coordinates
      zoomLevel
    }
  }
`;


export const GET_FEATURES = gql`
  query Feature {
    Feature @client {
      id
    }
  }
`;

