# Marien van Overbeek

> Branch `master` is automatically deployed to [marienvanoverbeek.nl](https://marienvanoverbeek.nl/)
> via GitHub Pages.

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun run dev`             | Starts local dev server at `localhost:4321`      |
| `bun run build`           | Build the production site to `./dist/`           |
| `bun run preview`         | Preview build locally, before deploying          |
| `bun run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun run astro -- --help` | Get help using the Astro CLI                     |

## 🚀 Project Structure

Inside of my Astro project, you'll see the following folders and files:

```text
/
├── .github/          # GitHub Actions
├── content/          # Content files shared between Astro site and PDF
│   └── cv.json       # CV content (🚨 always test PDF 🚨)
├── public/           # Static assets, like images
│   └── cv.pdf        # Generated PDF (recruiters like this)
├── scripts/          # scripts for building/watching other stuff than Astro
├── src/
│   ├── components/   # All React components
│   ├── layouts/      # All page layouts
│   └── pages/        # All pages of the site
├── bun.lockb         # Lockfile for bun 🚀
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is
exposed as a route based on its file name.

## 👀 Want to learn more?

Feel free to check [the Astro documentation](https://docs.astro.build) or jump into their [Discord server](https://astro.build/chat).
