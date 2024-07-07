import { Section } from "./elements/Section.tsx";
import { Heading } from "./elements/Heading.tsx";
import React from "react";
import { Devider } from "./elements/Devider.tsx";
import { RecipeSnippet } from "./elements/RecipeSnippet.tsx";
import recipes from "../content/recipes.json";

const recipesWithSlugs = Object.keys(recipes).reduce((acc, recipe) => {
  return {
    ...acc,
    [recipe]: {
      ...recipes[recipe as keyof typeof recipes],
      slug: recipe,
    },
  };
}, {});

export default () => {
  return (
    <>
      <Section>
        <Heading level="h1">Recipes</Heading>
        <Heading level="h2">subtiltle</Heading>
        <div className="max-w-[400px]">
          <p>123</p>
        </div>
      </Section>
      <Devider />
      <Section>
        {Object.keys(recipes).map((recipe) => (
          <RecipeSnippet
            recipe={recipesWithSlugs[recipe as keyof typeof recipesWithSlugs]}
          />
        ))}
      </Section>
    </>
  );
};

type RecipesType = typeof recipes;
type Recipe = RecipesType[keyof RecipesType];
