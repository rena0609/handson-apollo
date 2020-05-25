import gql from "graphql-tag";

// apollo-codegenがqueryを一意に識別できるよう、
// query {} でqueryに名前を付ける必要があります。
export const myWishListsQuery = gql`
  query myWishLists {
    myWishLists {
      id
      title
      description
      things {
        id
        name
        description
        nHowMany
      }
    }
  }
`;

export const createNewListMutation = gql`
  mutation createNewList($input: ListInput!) {
    createNewList(input: $input) {
      id
      title
      description
      things {
        id
        name
        description
        nHowMany
      }
    }
  }
`;
