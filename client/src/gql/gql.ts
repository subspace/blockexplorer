/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query Account($limit: Int!, $offset: Int!) {\n    accounts(limit: $limit, offset: $offset, orderBy: total_DESC) {\n      free\n      id\n      reserved\n      total\n      updatedAt\n      extrinsics(limit: 100) {\n        id\n      }\n    }\n  }\n": types.AccountDocument,
    "\n  query AccountsConnection($first: Int!, $after: String) {\n    accountsConnection(orderBy: total_DESC, first: $first, after: $after) {\n      totalCount\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n      edges {\n        cursor\n        node {\n          free\n          id\n          reserved\n          total\n          updatedAt\n          extrinsics(limit: 300) {\n            id\n          }\n        }\n      }\n    }\n  }\n": types.AccountsConnectionDocument,
    "\n  query AccountById($accountId: String!) {\n    accountById(id: $accountId) {\n      free\n      reserved\n      id\n      total\n      updatedAt\n      extrinsics(limit: 10) {\n        hash\n        id\n        block {\n          id\n          height\n        }\n        pos\n        name\n        success\n        timestamp\n        tip\n      }\n    }\n  }\n": types.AccountByIdDocument,
    "\n  query BlocksConnection($first: Int!, $after: String) {\n    blocksConnection(orderBy: height_DESC, first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          blockchainSize\n          extrinsicRoot\n          hash\n          height\n          id\n          parentHash\n          spacePledged\n          specId\n          stateRoot\n          timestamp\n          events(limit: 10) {\n            id\n          }\n          extrinsics(limit: 10) {\n            id\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n": types.BlocksConnectionDocument,
    "\n  query BlockById($blockId: BigInt!) {\n    blocks(limit: 10, where: { height_eq: $blockId }) {\n      id\n      height\n      hash\n      stateRoot\n      timestamp\n      extrinsicRoot\n      specId\n      parentHash\n      extrinsics(limit: 10, orderBy: block_height_DESC) {\n        id\n        hash\n        name\n        block {\n          height\n          timestamp\n        }\n        pos\n      }\n      events(limit: 10, orderBy: block_height_DESC) {\n        id\n        name\n        phase\n        pos\n        block {\n          height\n          id\n        }\n        extrinsic {\n          pos\n          block {\n            height\n            id\n          }\n        }\n      }\n      logs(limit: 10, orderBy: block_height_DESC) {\n        block {\n          height\n          timestamp\n        }\n        kind\n        id\n      }\n    }\n  }\n": types.BlockByIdDocument,
    "\n  query Events($limit: Int!, $offset: Int!) {\n    events(limit: $limit, offset: $offset, orderBy: block_height_DESC) {\n      name\n      phase\n      pos\n      id\n      block {\n        height\n        timestamp\n      }\n      indexInBlock\n    }\n  }\n": types.EventsDocument,
    "\n  query EventsConnection($first: Int!, $after: String) {\n    eventsConnection(orderBy: block_height_DESC, first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          args\n          id\n          indexInBlock\n          name\n          phase\n          pos\n          timestamp\n          block {\n            id\n            timestamp\n            height\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n        hasPreviousPage\n        startCursor\n      }\n      totalCount\n    }\n  }\n": types.EventsConnectionDocument,
    "\n  query EventById($eventId: String!) {\n    eventById(id: $eventId) {\n      args\n      id\n      indexInBlock\n      name\n      phase\n      pos\n      timestamp\n      call {\n        args\n        name\n        success\n        timestamp\n        id\n      }\n      extrinsic {\n        args\n        success\n        tip\n        fee\n        id\n        signer {\n          id\n        }\n      }\n      block {\n        height\n        id\n        timestamp\n        specId\n        hash\n      }\n    }\n  }\n": types.EventByIdDocument,
    "\n  query ExtrinsicsConnection($first: Int!, $after: String) {\n    extrinsicsConnection(orderBy: block_height_DESC, first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          hash\n          pos\n          id\n          success\n          block {\n            id\n            timestamp\n            height\n          }\n          name\n          nonce\n        }\n      }\n      pageInfo {\n        endCursor\n        hasPreviousPage\n        hasNextPage\n        startCursor\n      }\n      totalCount\n    }\n  }\n": types.ExtrinsicsConnectionDocument,
    "\n  query ExtrinsicsById($extrinsicId: String!) {\n    extrinsicById(id: $extrinsicId) {\n      pos\n      id\n      hash\n      signature\n      success\n      tip\n      args\n      block {\n        height\n        id\n        events(limit: 10) {\n          id\n          name\n          phase\n          pos\n          block {\n            height\n            id\n          }\n          extrinsic {\n            id\n            pos\n            block {\n              height\n              id\n            }\n          }\n        }\n        timestamp\n      }\n      name\n    }\n  }\n": types.ExtrinsicsByIdDocument,
    "\n  query HomeQuery($limit: Int!, $offset: Int!, $accountTotal: BigInt!) {\n    blocks(limit: $limit, offset: $offset, orderBy: height_DESC) {\n      id\n      hash\n      height\n      timestamp\n      stateRoot\n      blockchainSize\n      spacePledged\n      extrinsicsCount\n      eventsCount\n    }\n    extrinsics(limit: $limit, offset: $offset, orderBy: timestamp_DESC) {\n      hash\n      id\n      success\n      pos\n      block {\n        id\n        height\n      }\n      name\n    }\n    accountsConnection(orderBy: id_ASC, where: { total_gt: $accountTotal }) {\n      totalCount\n    }\n    extrinsicsConnection(orderBy: id_ASC, where: { signature_isNull: false }) {\n      totalCount\n    }\n  }\n": types.HomeQueryDocument,
    "\n  query LogsConnection($first: Int!, $after: String) {\n    logsConnection(orderBy: block_height_DESC, first: $first, after: $after) {\n      totalCount\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n      edges {\n        node {\n          id\n          kind\n          block {\n            id\n            height\n            timestamp\n          }\n        }\n        cursor\n      }\n    }\n  }\n": types.LogsConnectionDocument,
    "\n  query LogById($logId: String!) {\n    logById(id: $logId) {\n      id\n      kind\n      block {\n        id\n        height\n        timestamp\n        events(limit: 10, orderBy: id_DESC) {\n          id\n          args\n          name\n          phase\n          pos\n          timestamp\n          block {\n            height\n            hash\n          }\n        }\n      }\n    }\n  }\n": types.LogByIdDocument,
};

export function graphql(source: "\n  query Account($limit: Int!, $offset: Int!) {\n    accounts(limit: $limit, offset: $offset, orderBy: total_DESC) {\n      free\n      id\n      reserved\n      total\n      updatedAt\n      extrinsics(limit: 100) {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query Account($limit: Int!, $offset: Int!) {\n    accounts(limit: $limit, offset: $offset, orderBy: total_DESC) {\n      free\n      id\n      reserved\n      total\n      updatedAt\n      extrinsics(limit: 100) {\n        id\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query AccountsConnection($first: Int!, $after: String) {\n    accountsConnection(orderBy: total_DESC, first: $first, after: $after) {\n      totalCount\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n      edges {\n        cursor\n        node {\n          free\n          id\n          reserved\n          total\n          updatedAt\n          extrinsics(limit: 300) {\n            id\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query AccountsConnection($first: Int!, $after: String) {\n    accountsConnection(orderBy: total_DESC, first: $first, after: $after) {\n      totalCount\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n      edges {\n        cursor\n        node {\n          free\n          id\n          reserved\n          total\n          updatedAt\n          extrinsics(limit: 300) {\n            id\n          }\n        }\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query AccountById($accountId: String!) {\n    accountById(id: $accountId) {\n      free\n      reserved\n      id\n      total\n      updatedAt\n      extrinsics(limit: 10) {\n        hash\n        id\n        block {\n          id\n          height\n        }\n        pos\n        name\n        success\n        timestamp\n        tip\n      }\n    }\n  }\n"): (typeof documents)["\n  query AccountById($accountId: String!) {\n    accountById(id: $accountId) {\n      free\n      reserved\n      id\n      total\n      updatedAt\n      extrinsics(limit: 10) {\n        hash\n        id\n        block {\n          id\n          height\n        }\n        pos\n        name\n        success\n        timestamp\n        tip\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query BlocksConnection($first: Int!, $after: String) {\n    blocksConnection(orderBy: height_DESC, first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          blockchainSize\n          extrinsicRoot\n          hash\n          height\n          id\n          parentHash\n          spacePledged\n          specId\n          stateRoot\n          timestamp\n          events(limit: 10) {\n            id\n          }\n          extrinsics(limit: 10) {\n            id\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query BlocksConnection($first: Int!, $after: String) {\n    blocksConnection(orderBy: height_DESC, first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          blockchainSize\n          extrinsicRoot\n          hash\n          height\n          id\n          parentHash\n          spacePledged\n          specId\n          stateRoot\n          timestamp\n          events(limit: 10) {\n            id\n          }\n          extrinsics(limit: 10) {\n            id\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query BlockById($blockId: BigInt!) {\n    blocks(limit: 10, where: { height_eq: $blockId }) {\n      id\n      height\n      hash\n      stateRoot\n      timestamp\n      extrinsicRoot\n      specId\n      parentHash\n      extrinsics(limit: 10, orderBy: block_height_DESC) {\n        id\n        hash\n        name\n        block {\n          height\n          timestamp\n        }\n        pos\n      }\n      events(limit: 10, orderBy: block_height_DESC) {\n        id\n        name\n        phase\n        pos\n        block {\n          height\n          id\n        }\n        extrinsic {\n          pos\n          block {\n            height\n            id\n          }\n        }\n      }\n      logs(limit: 10, orderBy: block_height_DESC) {\n        block {\n          height\n          timestamp\n        }\n        kind\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query BlockById($blockId: BigInt!) {\n    blocks(limit: 10, where: { height_eq: $blockId }) {\n      id\n      height\n      hash\n      stateRoot\n      timestamp\n      extrinsicRoot\n      specId\n      parentHash\n      extrinsics(limit: 10, orderBy: block_height_DESC) {\n        id\n        hash\n        name\n        block {\n          height\n          timestamp\n        }\n        pos\n      }\n      events(limit: 10, orderBy: block_height_DESC) {\n        id\n        name\n        phase\n        pos\n        block {\n          height\n          id\n        }\n        extrinsic {\n          pos\n          block {\n            height\n            id\n          }\n        }\n      }\n      logs(limit: 10, orderBy: block_height_DESC) {\n        block {\n          height\n          timestamp\n        }\n        kind\n        id\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query Events($limit: Int!, $offset: Int!) {\n    events(limit: $limit, offset: $offset, orderBy: block_height_DESC) {\n      name\n      phase\n      pos\n      id\n      block {\n        height\n        timestamp\n      }\n      indexInBlock\n    }\n  }\n"): (typeof documents)["\n  query Events($limit: Int!, $offset: Int!) {\n    events(limit: $limit, offset: $offset, orderBy: block_height_DESC) {\n      name\n      phase\n      pos\n      id\n      block {\n        height\n        timestamp\n      }\n      indexInBlock\n    }\n  }\n"];
export function graphql(source: "\n  query EventsConnection($first: Int!, $after: String) {\n    eventsConnection(orderBy: block_height_DESC, first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          args\n          id\n          indexInBlock\n          name\n          phase\n          pos\n          timestamp\n          block {\n            id\n            timestamp\n            height\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n        hasPreviousPage\n        startCursor\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query EventsConnection($first: Int!, $after: String) {\n    eventsConnection(orderBy: block_height_DESC, first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          args\n          id\n          indexInBlock\n          name\n          phase\n          pos\n          timestamp\n          block {\n            id\n            timestamp\n            height\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n        hasPreviousPage\n        startCursor\n      }\n      totalCount\n    }\n  }\n"];
export function graphql(source: "\n  query EventById($eventId: String!) {\n    eventById(id: $eventId) {\n      args\n      id\n      indexInBlock\n      name\n      phase\n      pos\n      timestamp\n      call {\n        args\n        name\n        success\n        timestamp\n        id\n      }\n      extrinsic {\n        args\n        success\n        tip\n        fee\n        id\n        signer {\n          id\n        }\n      }\n      block {\n        height\n        id\n        timestamp\n        specId\n        hash\n      }\n    }\n  }\n"): (typeof documents)["\n  query EventById($eventId: String!) {\n    eventById(id: $eventId) {\n      args\n      id\n      indexInBlock\n      name\n      phase\n      pos\n      timestamp\n      call {\n        args\n        name\n        success\n        timestamp\n        id\n      }\n      extrinsic {\n        args\n        success\n        tip\n        fee\n        id\n        signer {\n          id\n        }\n      }\n      block {\n        height\n        id\n        timestamp\n        specId\n        hash\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query ExtrinsicsConnection($first: Int!, $after: String) {\n    extrinsicsConnection(orderBy: block_height_DESC, first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          hash\n          pos\n          id\n          success\n          block {\n            id\n            timestamp\n            height\n          }\n          name\n          nonce\n        }\n      }\n      pageInfo {\n        endCursor\n        hasPreviousPage\n        hasNextPage\n        startCursor\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query ExtrinsicsConnection($first: Int!, $after: String) {\n    extrinsicsConnection(orderBy: block_height_DESC, first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          hash\n          pos\n          id\n          success\n          block {\n            id\n            timestamp\n            height\n          }\n          name\n          nonce\n        }\n      }\n      pageInfo {\n        endCursor\n        hasPreviousPage\n        hasNextPage\n        startCursor\n      }\n      totalCount\n    }\n  }\n"];
export function graphql(source: "\n  query ExtrinsicsById($extrinsicId: String!) {\n    extrinsicById(id: $extrinsicId) {\n      pos\n      id\n      hash\n      signature\n      success\n      tip\n      args\n      block {\n        height\n        id\n        events(limit: 10) {\n          id\n          name\n          phase\n          pos\n          block {\n            height\n            id\n          }\n          extrinsic {\n            id\n            pos\n            block {\n              height\n              id\n            }\n          }\n        }\n        timestamp\n      }\n      name\n    }\n  }\n"): (typeof documents)["\n  query ExtrinsicsById($extrinsicId: String!) {\n    extrinsicById(id: $extrinsicId) {\n      pos\n      id\n      hash\n      signature\n      success\n      tip\n      args\n      block {\n        height\n        id\n        events(limit: 10) {\n          id\n          name\n          phase\n          pos\n          block {\n            height\n            id\n          }\n          extrinsic {\n            id\n            pos\n            block {\n              height\n              id\n            }\n          }\n        }\n        timestamp\n      }\n      name\n    }\n  }\n"];
export function graphql(source: "\n  query HomeQuery($limit: Int!, $offset: Int!, $accountTotal: BigInt!) {\n    blocks(limit: $limit, offset: $offset, orderBy: height_DESC) {\n      id\n      hash\n      height\n      timestamp\n      stateRoot\n      blockchainSize\n      spacePledged\n      extrinsicsCount\n      eventsCount\n    }\n    extrinsics(limit: $limit, offset: $offset, orderBy: timestamp_DESC) {\n      hash\n      id\n      success\n      pos\n      block {\n        id\n        height\n      }\n      name\n    }\n    accountsConnection(orderBy: id_ASC, where: { total_gt: $accountTotal }) {\n      totalCount\n    }\n    extrinsicsConnection(orderBy: id_ASC, where: { signature_isNull: false }) {\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query HomeQuery($limit: Int!, $offset: Int!, $accountTotal: BigInt!) {\n    blocks(limit: $limit, offset: $offset, orderBy: height_DESC) {\n      id\n      hash\n      height\n      timestamp\n      stateRoot\n      blockchainSize\n      spacePledged\n      extrinsicsCount\n      eventsCount\n    }\n    extrinsics(limit: $limit, offset: $offset, orderBy: timestamp_DESC) {\n      hash\n      id\n      success\n      pos\n      block {\n        id\n        height\n      }\n      name\n    }\n    accountsConnection(orderBy: id_ASC, where: { total_gt: $accountTotal }) {\n      totalCount\n    }\n    extrinsicsConnection(orderBy: id_ASC, where: { signature_isNull: false }) {\n      totalCount\n    }\n  }\n"];
export function graphql(source: "\n  query LogsConnection($first: Int!, $after: String) {\n    logsConnection(orderBy: block_height_DESC, first: $first, after: $after) {\n      totalCount\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n      edges {\n        node {\n          id\n          kind\n          block {\n            id\n            height\n            timestamp\n          }\n        }\n        cursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query LogsConnection($first: Int!, $after: String) {\n    logsConnection(orderBy: block_height_DESC, first: $first, after: $after) {\n      totalCount\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n      edges {\n        node {\n          id\n          kind\n          block {\n            id\n            height\n            timestamp\n          }\n        }\n        cursor\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query LogById($logId: String!) {\n    logById(id: $logId) {\n      id\n      kind\n      block {\n        id\n        height\n        timestamp\n        events(limit: 10, orderBy: id_DESC) {\n          id\n          args\n          name\n          phase\n          pos\n          timestamp\n          block {\n            height\n            hash\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query LogById($logId: String!) {\n    logById(id: $logId) {\n      id\n      kind\n      block {\n        id\n        height\n        timestamp\n        events(limit: 10, orderBy: id_DESC) {\n          id\n          args\n          name\n          phase\n          pos\n          timestamp\n          block {\n            height\n            hash\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;