import React from "react";
import { WishLists, CreateNewList } from "./WishLists/WishLists";

export const App = () => {
  return (
    <>
      <CreateNewList />
      <WishLists />
    </>
  );
};
