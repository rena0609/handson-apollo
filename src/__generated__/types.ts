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

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
