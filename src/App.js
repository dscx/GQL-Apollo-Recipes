import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Recipies from "./RecipiesComponent";
import AddRecipe from "./AddRecipe";

import "./App.css";

const resolvers = {
  Recipe: {
    isStarred: parent => {
      const starredRecipes = JSON.parse(localStorage.getItem("starredRecipies")) || [];
      return starredRecipes.includes(parent.id)
    }
  },
  Mutation: {
    updateRecipeStarred: (_, variables) => {
      const starredRecipes =
        JSON.parse(localStorage.getItem("starredRecipies")) || [];
      if (variables.isStarred) {
        localStorage.setItem(
          "starredRecipies",
          JSON.stringify(starredRecipes.concat([variables.id]))
        );
      } else {
        localStorage.setItem(
          "starredRecipies",
          JSON.stringify(starredRecipes.filter(id => id !== variables.id))
        );
      }
      return {
        __typeName: "Recipe",
        isStarred: variables.isStarred
      };
    }
  }
};

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  clientState: {
    resolvers
  }
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AddRecipe />
        <Recipies />
      </ApolloProvider>
    );
  }
}

export default App;
