import { makeExecutableSchema } from "graphql-tools";
import { ApolloServer } from "apollo-server";

// GraphQL schema languageを利用して、APIスキーマを定義する
const typeDefs = `
    type Mutation {
      addWhatIWantToList(input: WhatIWantInput!): WishList!
          createNewList(input: ListInput!): [WishList!]!
    }
  
    input WhatIWantInput {
      name: String!
          description: String
          nHowMany: Int!
      listId: Int!
    }
  
      input ListInput {
          title: String!
          description: String	
      }
  
    type WhatIWant {
      id: Int!
      name: String!
      description: String
      nHowMany: Int!
    }
  
    type WishList {
      id: Int!
      title: String!
      description: String
      things: [WhatIWant!]!
    }
  
    type Query {
          # All wishlists
          myWishLists: [WishList!]!
      whatIWant(id: Int!): WhatIWant!
          wishList(id: Int!): WishList!
      wishLists(id: Int!): [WishList!]!
    }
  `;
const BooksIWant = [
  {
    id: 1,
    name: "Haskellによる並列・並行プログラミング",
    description: "難しそう",
    nHowMany: 1
  },
  {
    id: 2,
    name:
      "Coq/SSReflect/MathCompによる定理証明:フリーソフトではじめる数学の形式化",
    description: "最近出たっぽい",
    nHowMany: 1
  }
];

const FoodsIWannaEat = [
  {
    id: 3,
    name: "うな重",
    description: "食べて応援",
    nHowMany: 10
  },
  {
    id: 4,
    name: "エビフライ",
    description: "普通に好き",
    nHowMany: 5
  }
];

const whatIWants = [...BooksIWant, ...FoodsIWannaEat];

const wishLists = [
  {
    id: 1,
    title: "ほしい本",
    description: "ほしいけれど高くて買えていない本のリスト",
    things: BooksIWant
  },
  {
    id: 2,
    title: "食べたいもの",
    description: "高級食材",
    things: FoodsIWannaEat
  }
];

// スキーマのフィールドごとに、対応するresolverを定義する
const resolvers = {
  Query: {
    myWishLists: () => wishLists,
    whatIWant: (_, { id }) => whatIWants.find(v => id === v.id),
    wishList: (_, { id }) => wishLists.find(v => id === v.id)
  },
  Mutation: {
    addWhatIWantToList: (
      _,
      { input: { nHowMany, name, description, listId } }
    ) => {
      const wl = wishLists.find(v => v.id === listId);
      const { things } = wl;
      const id = whatIWants[whatIWants.length - 1].id + 1;
      const newItem = {
        id,
        nHowMany,
        name,
        description
      };
      things.push(newItem);
      // Update API side datastore
      whatIWants.push(newItem);
      const newList = {
        ...wl,
        things
      };
      wishLists.filter(v => v.id !== listId).push(newList);
      return newList;
    },
    createNewList: (_, { input: { title, description } }) => {
      const id = wishLists[wishLists.length - 1].id + 1;
      const newList = {
        id,
        title,
        description,
        things: []
      };
      wishLists.push(newList);
      return wishLists;
    }
  }
};

// GraphQL.jsのスキーマオブジェクトを構成する
// スキーマオブジェクトは、ApolloServerの初期化に必要
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// [任意] HTTPヘッダやAPIシークレットなどの情報を登録する
// 詳細 -> https://www.apollographql.com/docs/apollo-server/essentials/data.html#context
export function context(headers, secrets) {
  return {
    headers,
    secrets
  };
}

const server = new ApolloServer({
  schema
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
