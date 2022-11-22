import { gql } from '@apollo/client'

export const QUERY_EVENT_LIST = gql`
  query Events($limit: Int!, $offset: Int!) {
    events(limit: $limit, offset: $offset, orderBy: block_height_DESC) {
      name
      phase
      pos
      id
      block {
        height
        timestamp
      }
      indexInBlock
    }
  }
`

export const QUERY_EVENT_CONNECTION_LIST = gql`
  query EventsConnection($first: Int!, $after: String) {
    eventsConnection(orderBy: block_height_DESC, first: $first, after: $after) {
      edges {
        cursor
        node {
          args
          id
          indexInBlock
          name
          phase
          pos
          timestamp
          block {
            id
            timestamp
            height
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`
