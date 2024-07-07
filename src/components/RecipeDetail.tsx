import { Section } from "./elements/Section.tsx";
import { Heading } from "./elements/Heading.tsx";
import React from "react";
import { Devider } from "./elements/Devider.tsx";
import recipes from "../content/recipes.json";
import ReactMarkdown from "react-markdown";
import settings from "../constants/settings.json";

export default ({ recipe }: { recipe: Recipe }) => {
  return (
    <>
      <Section>
        <Heading level="h1">
          One-Pot
          <br />
          No Spot
        </Heading>
        <Heading level="h2">{recipe.title}</Heading>
        <div className="max-w-[400px]">
          <ReactMarkdown>{recipe.intro}</ReactMarkdown>
        </div>
        <br />
        <a href={`/${settings.recipeSlug}`}>
          <u>« Back to all recipes</u>
        </a>
      </Section>
      <Devider />
      <Section>
        <Heading level="h2">Preparation of the meal</Heading>
        <ReactMarkdown
          components={{
            h2({ children }) {
              return (
                <>
                  <br />
                  <Heading level="h2">{children}</Heading>
                </>
              );
            },
          }}
        >
          {recipe.content}
        </ReactMarkdown>
      </Section>
    </>
  );
};

type RecipesType = typeof recipes;
type Recipe = RecipesType[keyof RecipesType];
