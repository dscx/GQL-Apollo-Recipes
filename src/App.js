import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Recipies from "./RecipiesComponent";
import AddRecipe from "./AddRecipe";

import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/"
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
