/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      userConversations {
        items {
          isPrivate
          name
          status
          convoLinkUserId
          convoLinkConversationId
        }
        nextToken
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        userConversations {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      content
      createdAt
      chatbot
      isSent
      isChild
      files {
        bucket
        region
        key
      }
      messageUserId
      messageUserName
      messageConversationId
      user {
        id
        username
        userConversations {
          nextToken
        }
      }
      conversation {
        id
        name
        isPrivate
        type
        createdAt
        messages {
          nextToken
        }
        associated {
          nextToken
        }
        editors
      }
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        createdAt
        chatbot
        isSent
        isChild
        files {
          bucket
          region
          key
        }
        messageUserId
        messageUserName
        messageConversationId
        user {
          id
          username
        }
        conversation {
          id
          name
          isPrivate
          type
          createdAt
          editors
        }
      }
      nextToken
    }
  }
`;
export const getConversation = /* GraphQL */ `
  query GetConversation($id: ID!) {
    getConversation(id: $id) {
      id
      name
      isPrivate
      type
      createdAt
      messages {
        items {
          id
          content
          createdAt
          chatbot
          isSent
          isChild
          messageUserId
          messageUserName
          messageConversationId
        }
        nextToken
      }
      associated {
        items {
          isPrivate
          name
          status
          convoLinkUserId
          convoLinkConversationId
        }
        nextToken
      }
      editors
    }
  }
`;
export const listConversations = /* GraphQL */ `
  query ListConversations(
    $filter: ModelConversationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConversations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        isPrivate
        type
        createdAt
        messages {
          nextToken
        }
        associated {
          nextToken
        }
        editors
      }
      nextToken
    }
  }
`;
export const getConvoLink = /* GraphQL */ `
  query GetConvoLink($id: ID!) {
    getConvoLink(id: $id) {
      isPrivate
      name
      status
      convoLinkUserId
      convoLinkConversationId
      user {
        id
        username
        userConversations {
          nextToken
        }
      }
      conversation {
        id
        name
        isPrivate
        type
        createdAt
        messages {
          nextToken
        }
        associated {
          nextToken
        }
        editors
      }
    }
  }
`;
export const listConvoLinks = /* GraphQL */ `
  query ListConvoLinks(
    $filter: ModelConvoLinkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConvoLinks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        isPrivate
        name
        status
        convoLinkUserId
        convoLinkConversationId
        user {
          id
          username
        }
        conversation {
          id
          name
          isPrivate
          type
          createdAt
          editors
        }
      }
      nextToken
    }
  }
`;
