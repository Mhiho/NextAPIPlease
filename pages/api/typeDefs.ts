import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
type Query {
  getAllUsers: [User]!
  getUserById(id: ID!): User
}

type Mutation {
  signUp(data: SignUpInput!): AuthPayload!
  login(data: LoginUserInput!): AuthPayload!
  createPoem(data: CreatePoemInput!): Poem!
}

type User {
  id: ID!
  email: String!
  password: String!
  name: String!
  profile: Profile,
}

type Token {
  tokenId: String
  token: String
  userId: String
}

type Profile {
  id: ID!
  bio: String
  userId: ID!
  user: User!
}

type AuthPayload {
  user: User!
  token: Token
}

input SignUpInput {
  name: String!
  email: String!
  password: String!
}

input LoginUserInput {
  email: String!
  password: String!
}

type Poem {
  id:        Int     
  title:     String
  content:   String
  published: Boolean 
  author:    User  
  authorId:  String
}
input CreatePoemInput {
  title: String
  content: String
  published: Boolean
  authorId: String
}

`