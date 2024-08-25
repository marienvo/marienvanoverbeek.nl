import React, { type FC } from "react";
import { Heading } from "./Heading.tsx";
import recipes from "../../content/recipes.json";
import ReactMarkdown from "react-markdown";
import settings from "../../constants/settings.json";
import Image from "./Image.tsx";
import getOneToSix from "../helpers/getOneToSix.ts";

export const RecipeSnippet: FC<RecipeProperties> = ({ recipe, index }) => {
  if (!recipe.meta.score.includes("⭐")) return null;
  const image = recipe.images[0];

  return (
    <div style={{ marginBottom: 40 }}>
      <div className="grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-2 mt-2 mb-5 max-w-[200px] order-last lg:order-first">
          <div>
            {image && (
              <Image
                src={image}
                alt={recipe.title}
                rotation={getOneToSix(index)}
                size="sm"
              />
            )}
          </div>
        </div>
        <div className="lg:col-span-10">
          <Heading level="h2">
            <a href={`/${settings.recipeSlug}/${recipe.slug}`}>
              {recipe.title}
            </a>
            {(recipe.meta.vegan && (
              <sup
                style={{ cursor: "default" }}
                title="Fully plant-based, 100% vegan"
              >
                🌿✨
              </sup>
            )) ||
              (recipe.meta.vega && (
                <sup
                  style={{ cursor: "default" }}
                  title="Suitable for vegetarians"
                >
                  🌱
                </sup>
              ))}
          </Heading>
          <ReactMarkdown
            components={{
              em({ children }) {
                const getLabel = (value: string) => {
                  switch (value) {
                    case "🥬🥬🥬":
                      return "Your body will thank you!";
                    case "🥬🥬":
                      return "A solid choice!";
                    case "🥬":
                      return "Good in moderation!";
                    case "⚖️":
                      return "Not the worst, but not the healthiest either";
                    case "🍔":
                      return "Treat yourself, but don't overdo it!";
                    case "🍔🍔":
                      return "Tasty for sure, but limit your intake!";
                    case "🍔🍔🍔":
                      return "Handle with care!";
                    default:
                      return undefined;
                  }
                };
                return (
                  <span
                    style={{ cursor: "default" }}
                    title={getLabel(children.toString())}
                  >
                    {children}
                  </span>
                );
              },
            }}
          >{`${recipe.intro} _${recipe.meta.healthy}_`}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

type RecipeProperties = {
  recipe: Recipe & { slug: string };
  index: number;
};

type RecipesType = typeof recipes;
type Recipe = RecipesType[keyof RecipesType];
