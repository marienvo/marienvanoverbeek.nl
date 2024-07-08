import React, { type FC } from "react";
import { Heading } from "./Heading.tsx";
import recipes from "../../content/recipes.json";
import ReactMarkdown from "react-markdown";
import settings from "../../constants/settings.json";

export const RecipeSnippet: FC<RecipeProperties> = ({ recipe }) => {
  if (!recipe.meta.score.includes("⭐")) return null;

  return (
    <div style={{ marginBottom: 40 }}>
      <Heading level="h2">
        <a href={`/${settings.recipeSlug}/${recipe.slug}`}>
          {recipe.title}
          <sup>{recipe.meta.score}</sup>
        </a>
      </Heading>
      <ReactMarkdown>{recipe.intro}</ReactMarkdown>
      <p>Health score: {recipe.meta.healthy}</p>
    </div>
  );
};

type RecipeProperties = {
  recipe: Recipe & { slug: string };
};

type RecipesType = typeof recipes;
type Recipe = RecipesType[keyof RecipesType];
