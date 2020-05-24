import * as React from "react";
import { Query } from "react-apollo";
import { myWishListsQuery } from "./queries";
import { myWishLists } from "src/__generated__/types";

export const WishLists: React.SFC = () => (
  <div className="WishLists">
    <h1>ほしい物リスト一覧</h1>
    <Query<myWishLists> query={myWishListsQuery}>
      {result => {
        if (result.error) {
          return <p className="error">Error: {result.error.message}</p>;
        }
        if (result.loading) {
          return <p className="loading">Loading...</p>;
        }
        const { data } = result;

        return (
          <ul className="WishLists">
            {data!.myWishLists.map(wishList => (
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
        );
      }}
    </Query>
  </div>
);
