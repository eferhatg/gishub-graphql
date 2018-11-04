import gql from "graphql-tag";
export const GET_LAYERS_BY_ID = gql `
  query getLayersById($ids: [Int]) {
    getLayersById(ids: $ids) {
      id
      clientId
      categoryId
      name
      type
      features {
        id
        layerId
        geometry
        properties
        type
      }
      brief {
        col
        type
        title
        validation
      }
    }
  }
`;


export const GET_SELECTED_LAYER_BRIEF = gql `
  query getLayersById($ids: [Int]) {
    getLayersById(ids: $ids) @client {
      id
      brief {
        col
        type
        title
        validation
      }
    }
  }
`;



export const GET_SELECTED_FUTURE = gql `
  query SelectedFeature {
    selectedFeature @client {
      feature
    }
  }
`;