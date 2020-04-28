/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
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
export const onCreateConversation = /* GraphQL */ `
  subscription OnCreateConversation {
    onCreateConversation {
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
export const onUpdateConversation = /* GraphQL */ `
  subscription OnUpdateConversation {
    onUpdateConversation {
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
export const onDeleteConversation = /* GraphQL */ `
  subscription OnDeleteConversation {
    onDeleteConversation {
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
export const onCreateConvoLink = /* GraphQL */ `
  subscription OnCreateConvoLink {
    onCreateConvoLink {
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
export const onUpdateConvoLink = /* GraphQL */ `
  subscription OnUpdateConvoLink {
    onUpdateConvoLink {
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
export const onDeleteConvoLink = /* GraphQL */ `
  subscription OnDeleteConvoLink {
    onDeleteConvoLink {
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
