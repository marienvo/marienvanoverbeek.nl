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
        <Heading level="h1">
          One-Pot
          <br />
          No Spot
        </Heading>
        <div className="max-w-[400px]">
          <p>
            No one has time for extensive cooking. That's why I have a selection
            of one-pot dishes. These recipes are not only quick & easy, but also
            ensure minimal dishes. Delightful.
          </p>
        </div>
      </Section>
      <Devider />
      <Section>
        {Object.keys(recipes)
          .sort()
          .map((recipe) => (
            <RecipeSnippet
              recipe={recipesWithSlugs[recipe as keyof typeof recipesWithSlugs]}
            />
          ))}
      </Section>
      <div className="w-full bg-gray-800 text-gray-50">
        <Section isTransparent>
          <br />
          <br />
          <br />
          <br />
        </Section>
      </div>
    </>
  );
};

type RecipesType = typeof recipes;
type Recipe = RecipesType[keyof RecipesType];
