import { gql } from '@apollo/client';

export const LOAD_SIMPLEPOST = gql`
    query {
        simplePosts{
          id,
          guid,
          text,
          date,
          createdAt,
          updatedAt
        }
      }
`;