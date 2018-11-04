const Mutation = `
type LoginUserResponse {
  sessionToken: String
}
type Mutation {
  loginUser(email: String, password: String): LoginUserResponse

}
`;

export {Mutation}