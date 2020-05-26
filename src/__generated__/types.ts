/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addWhatIWantToList
// ====================================================

export interface addWhatIWantToList_addWhatIWantToList_things {
  __typename: "WhatIWant";
  id: number;
  name: string;
  description: string | null;
  nHowMany: number;
}

export interface addWhatIWantToList_addWhatIWantToList {
  __typename: "WishList";
  id: number;
  title: string;
  description: string | null;
  things: addWhatIWantToList_addWhatIWantToList_things[];
}

export interface addWhatIWantToList {
  addWhatIWantToList: addWhatIWantToList_addWhatIWantToList;
}

export interface addWhatIWantToListVariables {
  input: WhatIWantInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myWishLists
// ====================================================

export interface myWishLists_myWishLists_things {
  __typename: "WhatIWant";
  id: number;
  name: string;
  description: string | null;
  nHowMany: number;
}

export interface myWishLists_myWishLists {
  __typename: "WishList";
  id: number;
  title: string;
  description: string | null;
  things: myWishLists_myWishLists_things[];
}

export interface myWishLists {
  myWishLists: myWishLists_myWishLists[]; // All wishlists
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createNewList
// ====================================================

export interface createNewList_createNewList_things {
  __typename: "WhatIWant";
  id: number;
  name: string;
  description: string | null;
  nHowMany: number;
}

export interface createNewList_createNewList {
  __typename: "WishList";
  id: number;
  title: string;
  description: string | null;
  things: createNewList_createNewList_things[];
}

export interface createNewList {
  createNewList: createNewList_createNewList[];
}

export interface createNewListVariables {
  input: ListInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//
export interface WhatIWantInput {
  name: string;
  description?: string | null;
  nHowMany: number;
  listId: number;
}

//
export interface ListInput {
  title: string;
  description?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
