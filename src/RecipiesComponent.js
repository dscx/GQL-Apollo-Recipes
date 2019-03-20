import React, { Component } from "react";
import { Query } from "react-apollo";
import { recipesQuery } from "./recipesQuery";

export default class Recipes extends Component {
  state = {
    vegetarian: false
  };

  updateVegeatarian = ({ target: { checked } }) => {
    this.setState({ vegetarian: checked });
  };

  render() {
    return (
      <React.Fragment>
        <label>
          <input
            type="checkbox"
            checked={this.state.vegetarian}
            onChange={this.updateVegeatarian}
          />
          <span>vegetarian</span>
        </label>
        <Query
          query={recipesQuery}
          variables={{ vegetarian: this.state.vegetarian }}
        >
          {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Something Went Wrong</p>;
            if (data.recipes === undefined) return null;
            return (
              <ul>
                {data.recipes.map(({ id, title }) => (
                  <li key={id}>{title}</li>
                ))}
              </ul>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}
