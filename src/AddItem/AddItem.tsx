import React, { useState } from "react";
import { useMutation } from "react-apollo";
import { MutationUpdaterFn } from "apollo-client";
import { myWishListsQuery } from "../WishLists/queries";
import {
  addWhatIWantToList,
  myWishLists
  //addWhatIWantToListVariables,
} from "../__generated__/types";
import { addWhatIWantMutation } from "./queries";

const updateList: MutationUpdaterFn<addWhatIWantToList> = (cache, result) => {
  const { data } = result;
  const cachedLists = cache.readQuery<myWishLists>({ query: myWishListsQuery });
  if (data && cachedLists) {
    const newList = data.addWhatIWantToList;
    const currentLists = cachedLists.myWishLists;
    const newLists = [
      ...currentLists.filter(list => list.id !== newList.id),
      newList
    ].sort((a, b) => a.id - b.id);
    cache.writeQuery({
      query: myWishListsQuery,
      data: { myWishLists: newLists }
    });
  }
};

interface AddWhatIWantProps {
  listId: number;
}

export const AddWhatIWant: React.FC<AddWhatIWantProps> = ({ listId }) => {
  const [addWhatIWantToList] = useMutation<addWhatIWantToList>(
    addWhatIWantMutation,
    {
      update: updateList
    }
  );

  return (
    <div className="add-what-i-want">
      <WhatIWantForm
        add={(name: string, description: string, nHowMany: number) => {
          console.log(nHowMany, listId);
          addWhatIWantToList({
            variables: {
              input: {
                name,
                description,
                nHowMany,
                listId: listId
              }
            }
          });
        }}
      />
    </div>
  );
};

interface WhatIWantFormProps {
  add: (name: string, description: string, nHowMany: number) => void;
}

const WhatIWantForm: React.FC<WhatIWantFormProps> = ({ add }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [nHowMany, setNHowMany] = useState<number>(0);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    switch (input.name) {
      case "name":
        setName(input.value);
        break;
      case "description":
        setDescription(input.value);
        break;
      case "nHowMany":
        setNHowMany(parseInt(input.value, 10));
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // name, nHowMany フィールドは必須です
    if (!name) {
      return;
    }
    add(name, description, nHowMany);
  };

  return (
    <>
      <form className="list-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="four columns">
            <label htmlFor="itemName">名前</label>
            <input
              className="u-full-width"
              id="itemName"
              type="text"
              name="name"
              value={name}
              onChange={handleInput}
            />
          </div>
          <div className="four columns">
            <label htmlFor="itemDescription">説明</label>
            <input
              className="u-full-width"
              id="itemDescription"
              type="text"
              name="description"
              value={description}
              onChange={handleInput}
            />
          </div>
          <div className="four columns">
            <label htmlFor="nHowMany">数量</label>
            <input
              className="u-full-width"
              id="nHowMany"
              type="number"
              name="nHowMany"
              min={1}
              max={10}
              value={nHowMany}
              onChange={handleInput}
            />
          </div>
        </div>
        <button>追加</button>
      </form>
    </>
  );
};
