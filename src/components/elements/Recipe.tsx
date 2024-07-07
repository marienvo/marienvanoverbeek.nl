import type { FC } from "react";
import { Heading } from "./Heading.tsx";
import recipes from "../../content/recipes.json";

export const Recipe: FC<RecipeProperties> = ({ recipe }) => {
  return (
    <div>
      <Heading level="h3">{recipe.title}</Heading>
      <p>{recipe.content}</p>
    </div>
  );
};

type RecipeProperties = {
  recipe: Recipe;
};

type RecipesType = typeof recipes;
type Recipe = RecipesType[keyof RecipesType];
