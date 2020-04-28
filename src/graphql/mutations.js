/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
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
export const createConversation = /* GraphQL */ `
  mutation CreateConversation(
    $input: CreateConversationInput!
    $condition: ModelConversationConditionInput
  ) {
    createConversation(input: $input, condition: $condition) {
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
export const updateConversation = /* GraphQL */ `
  mutation UpdateConversation(
    $input: UpdateConversationInput!
    $condition: ModelConversationConditionInput
  ) {
    updateConversation(input: $input, condition: $condition) {
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
export const deleteConversation = /* GraphQL */ `
  mutation DeleteConversation(
    $input: DeleteConversationInput!
    $condition: ModelConversationConditionInput
  ) {
    deleteConversation(input: $input, condition: $condition) {
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
export const createConvoLink = /* GraphQL */ `
  mutation CreateConvoLink(
    $input: CreateConvoLinkInput!
    $condition: ModelConvoLinkConditionInput
  ) {
    createConvoLink(input: $input, condition: $condition) {
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
export const updateConvoLink = /* GraphQL */ `
  mutation UpdateConvoLink(
    $input: UpdateConvoLinkInput!
    $condition: ModelConvoLinkConditionInput
  ) {
    updateConvoLink(input: $input, condition: $condition) {
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
export const deleteConvoLink = /* GraphQL */ `
  mutation DeleteConvoLink(
    $input: DeleteConvoLinkInput!
    $condition: ModelConvoLinkConditionInput
  ) {
    deleteConvoLink(input: $input, condition: $condition) {
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
