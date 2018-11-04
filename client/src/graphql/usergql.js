import gql from "graphql-tag";
export const USER_DATA = gql `
query userData($sessionToken: String) {

  user:userData(sessionToken: $sessionToken) {
    id
    email
    mapTile
    initialZoom
    initialPosition
    client {
      id
      name
      mapboxKey
      tileList
    }
  }
}
`

export const USER_MAP_POSITION = gql `
query userData {
 
  user {
    id
    initialZoom
    initialPosition   
  }

  
}
`

