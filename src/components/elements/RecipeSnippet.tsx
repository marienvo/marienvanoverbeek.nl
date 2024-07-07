import React, { type FC } from "react";
import { Heading } from "./Heading.tsx";
import recipes from "../../content/recipes.json";

export const RecipeSnippet: FC<RecipeProperties> = ({ recipe }) => {
  return (
    <div>
      <Heading level="h2">
        <a href={`/recipes/${recipe.slug}`}>{recipe.title}</a>
      </Heading>
    </div>
  );
};

type RecipeProperties = {
  recipe: Recipe & { slug: string };
};

type RecipesType = typeof recipes;
type Recipe = RecipesType[keyof RecipesType];
