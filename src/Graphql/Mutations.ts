import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
mutation login(
  $usuario: String!
  $senha: String!
) {
  login(data: { usuario: $usuario, senha: $senha }) {
    token,
    user {
      usuario
    }
  }
}
`;

export const SIMPLEPOST_REGISTEr_MUTATION = gql`
mutation createSimplePost(
  $text: String!
  $date: DateTime!
) {
  createSimplePost(
    data: { text: $text, date: $date }){
    id,
    guid,
    text,
    date,
    createdAt,
    updatedAt
  }
}
`;

export const REMOVE_SIMPLEPOST_MUTATION = gql`
mutation deleteSimplePostById(
  $id: Float!
  ){
  deleteSimplePostById(id: $id)
}
`;

export const UPDATE_SIMPLEPOST_MUTATION = gql`
mutation updateSimplePost(
  $id: Float!
  $text: String
  $date: DateTime
){
  updateSimplePost(id: $id, data: { text: $text, date: $date}){
    id,
    text,
    date,
    createdAt,
    updatedAt
  }
}
`;