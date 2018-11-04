import gql from "graphql-tag";
export const GET_SELECTED_TAB = gql`
  query Sidebar {
    sidebar @client {
      collapsed
      selectedTab
    }
  }
`;

export const GET_DISPLAYED_LAYERS = gql`
  query DisplayedLayers {
    displayedLayers @client {
      ids
    }
  }
`;