const Schema = `#graphql
 scalar DATETIME
type User {
  id: String
  name: String
  email: String
  password: String
  createdAt: DATETIME
  updatedAt: DATETIME
  deletedAt: DATETIME
}
  type Event {
    id: ID!
    name: String
  }
  #handle user commands
  type Query {
    getAllEvent: [Event]
    getUser(id: String): User 
  }
`;
export default Schema;