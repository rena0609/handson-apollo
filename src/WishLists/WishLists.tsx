import React from "react";
import { myWishListsQuery } from "./queries";
import { myWishLists } from "src/__generated__/types";
import { useQuery } from "@apollo/react-hooks";

export const WishLists: React.FC = () => {
  const { loading, error, data } = useQuery<myWishLists>(myWishListsQuery);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div className="WishLists">
      <h1>ほしい物リスト一覧</h1>
      <ul className="WishLists">
        {data?.myWishLists.map(wishList => (
          // ほしいものリストの一覧
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
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
