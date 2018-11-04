import gql from "graphql-tag";
export const CATS_AND_BRIEF = gql `

query catsAndBrief($clientId: Int) {

  catsAndBrief(clientId: $clientId) {
    categories {
      id
      parentId
      name
      icon
    }
    layerBrief {
      id
      name
      type
      icon
      categoryId
      brief {
        col
        type
        title
        validation
      }
    }
  }
  }
`;