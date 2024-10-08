import { Section } from "./elements/Section.tsx";
import { Heading } from "./elements/Heading.tsx";
import React from "react";
import { Devider } from "./elements/Devider.tsx";
import recipes from "../content/recipes.json";
import ReactMarkdown from "react-markdown";
import settings from "../constants/settings.json";
import Image from "./elements/Image.tsx";

export default ({ recipe }: { recipe: Recipe }) => {
  const image = recipe.images[0];

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
        <div className="sm:grid sm:grid-cols-12 sm:gap-12">
          <div className="sm:col-span-6">
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
          </div>
          <div className="sm:col-span-1 hidden sm:block" />
          <div className="sm:col-span-5 sm:-mt-56 mt-12">
            {image && <Image src={image} alt={recipe.title} />}
          </div>
        </div>
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
