
const User = `
type User {
  id: Int
  clientId: Int
  email: String
  sessionToken: String
  initialPosition: Point
  createdAt: Date
  mapTile: String
  initialZoom: Int
  client: Client
}
`;
export {User};
