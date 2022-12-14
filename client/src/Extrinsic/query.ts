import { gql } from '@apollo/client'

export const QUERY_EXTRINSIC_LIST_CONNECTION = gql`
  query ExtrinsicsConnection($first: Int!, $after: String) {
    extrinsicsConnection(orderBy: block_height_DESC, first: $first, after: $after) {
      edges {
        cursor
        node {
          hash
          pos
          id
          success
          block {
            id
            timestamp
            height
          }
          name
          nonce
        }
      }
      pageInfo {
        endCursor
        hasPreviousPage
        hasNextPage
        startCursor
      }
      totalCount
    }
  }
`

export const QUERY_EXTRINSIC_BY_ID = gql`
  query ExtrinsicsById($extrinsicId: String!) {
    extrinsicById(id: $extrinsicId) {
      pos
      id
      hash
      signature
      success
      tip
      args
      block {
        height
        id
        events(limit: 10) {
          id
          name
          phase
          pos
          block {
            height
            id
          }
          extrinsic {
            id
            pos
            block {
              height
              id
            }
          }
        }
        timestamp
      }
      name
    }
  }
`
