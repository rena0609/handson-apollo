import gql from "graphql-tag";

export const addWhatIWantMutation = gql`
  mutation addWhatIWantToList($input: WhatIWantInput!) {
    addWhatIWantToList(input: $input) {
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
