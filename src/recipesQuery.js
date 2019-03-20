import gql from "graphql-tag";

export const recipesQuery = gql`
  query recipies($vegetarian: Boolean!) {
    recipes(vegetarian: $vegetarian) {
      id
      title
    }
  }
`;