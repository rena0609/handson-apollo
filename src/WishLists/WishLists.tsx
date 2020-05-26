import React, { useState } from "react";
import { myWishListsQuery, createNewListMutation } from "./queries";
import { myWishLists, createNewList } from "src/__generated__/types";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { MutationUpdaterFn } from "apollo-client";
import { AddWhatIWant } from "../AddItem/AddItem";

const updateList: MutationUpdaterFn<createNewList> = (cache, result) => {
  const { data } = result;
  cache.writeQuery({
    query: myWishListsQuery,
    data: { myWishLists: data!.createNewList }
  });
};

export const CreateNewList: React.FC = () => {
  const [addData] = useMutation<createNewList>(createNewListMutation, {
    update: updateList
  });
  return (
    <div className="create-new-list">
      <ListForm
        create={(title: string, description: string) => {
          addData({ variables: { input: { title, description } } });
        }}
      />
    </div>
  );
};

interface ListFormProps {
  create: (title: string, description: string) => void;
}

const ListForm: React.FC<ListFormProps> = ({ create }) => {
  //let input
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    switch (input.name) {
      case "title":
        setTitle(input.value);
        break;
      case "description":
        setDescription(input.value);
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    create(title, description);
  };

  return (
    <>
      <h2>リストを新規作成</h2>
      <form className="list-form" onSubmit={() => handleSubmit}>
        <div className="row">
          <div className="six columns">
            <label htmlFor={"listTitle"}>
              タイトル
              <input
                className="u-full-width"
                id="listTitle"
                type="text"
                name="title"
                value={title}
                onChange={handleInput}
                //ref={n => (input = n)}
              />
            </label>
          </div>
          <div className="six columns">
            <label htmlFor={"listDescription"}>
              説明
              <input
                className="u-full-width"
                id="listDescription"
                type="text"
                name="description"
                value={description}
                onChange={handleInput}
                //ref={n => (input = n)}
              />
            </label>
          </div>
          <button>作成</button>
        </div>
      </form>
    </>
  );
};

export const WishLists: React.FC = () => {
  const { loading, error, data } = useQuery<myWishLists>(myWishListsQuery);

  if (loading) return <>Loading...</>;
  if (error) return <>`Error! ${error.message}`</>;

  return (
    <div className="WishLists">
      <h2>ほしい物リスト一覧</h2>
      <ul className="WishLists">
        {data!.myWishLists.map(wishList => (
          // ほしいものリストの一覧
          <>
            <li key={wishList.id.toString()}>
              <strong>{wishList.title}</strong> - {wishList.description}
              <ul>
                {wishList.things.map(thing =>
                  thing ? (
                    <li key={thing.id.toString()}>
                      {thing.name}
                      <ul>
                        <li>
                          メモ - <em>{thing.description}</em>
                        </li>
                        <li>希望数: {thing.nHowMany}</li>
                      </ul>
                    </li>
                  ) : (
                    <p>このリストにはアイテムがありません</p>
                  )
                )}
                <div className="row">
                  <div className="four columns">
                    <AddWhatIWant listId={wishList.id} />
                  </div>
                </div>
              </ul>
            </li>
          </>
        ))}
      </ul>
      )
    </div>
  );
};
