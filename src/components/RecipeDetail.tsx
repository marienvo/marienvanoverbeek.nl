import { Section } from "./elements/Section.tsx";
import { Heading } from "./elements/Heading.tsx";
import React from "react";
import { Devider } from "./elements/Devider.tsx";
import recipes from "../content/recipes.json";
import ReactMarkdown from "react-markdown";

export default ({ recipe }: { recipe: Recipe }) => {
  return (
    <>
      <Section>
        <Heading level="h1">Recipes</Heading>
        <div className="max-w-[400px]">
          <a href="/recipes">Back to all recipes</a>
        </div>
      </Section>
      <Devider />
      <Section>
        <Heading level="h2">{recipe.title}</Heading>
        <ReactMarkdown>{recipe.content}</ReactMarkdown>
      </Section>
    </>
  );
};

type RecipesType = typeof recipes;
type Recipe = RecipesType[keyof RecipesType];
