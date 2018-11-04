const Query = `
scalar Date
scalar Point
scalar Array
scalar JSON
type Query {
  # client(id: Int, name: String): Client
  # clients(id: Int, name: String): [Client]
  userData(sessionToken: String): User
  catsAndBrief(clientId: Int):CatsAndBrief
  getLayer(id: Int):Layer
  getLayersById(ids:[Int]):[Layer]
  # users(clientId: Int): [User]
  # categories(clientId: Int): [Category]
  # layers(clientId: Int): [Layer]
  # features(layerId:Int):[Feature]
}
`;

export {Query}