# How to contribute

> Gridmix is an open-source project built by core maintainers and contributors. We want to make it easy for anyone to contribute to Gridmix. Contribute to core, build plugins, improve documentation or write a blog post. It all helps Gridmix on its mission to simplify Jamstack development.

Read the [code of conduct](/docs/code-of-conduct/).

## Contributing to Core

Gridmix uses a **monorepo** pattern to manage its dependencies and core plugins. To contribute to core you need to install Gridmix core locally. This also enables you to run **personal Gridmix projects** on latest **Gridmix development** version.

### Run Gridmix core locally

Install [Node.js 22.18](https://nodejs.org/en/download/) or higher and run `corepack enable` so the [pnpm](https://pnpm.io) version pinned in the repo's `package.json` is used automatically.

1. Clone the `https://github.com/gridmix/gridmix.git` repository.
2. Run `pnpm install` in the repo root. pnpm workspaces link all core packages together — no extra bootstrap step is needed.
3. Create a new Gridmix project inside the `./projects` folder. It's part of the pnpm workspace and ignored by git.
4. In your project's `package.json`, reference local packages with the workspace protocol — for example `"gridmix": "workspace:*"`. This makes pnpm symlink the local core packages instead of fetching them from npm.
5. Run `pnpm install` again (from anywhere in the repo) and start your project with `pnpm gridmix develop`.

The repo also contains a `playground` workspace that is already wired up this way — use it as a reference or as a quick test bed.

To use the local `@gridmix/cli` as a global command, enter the `./packages/cli` folder and run `pnpm link`.

**pnpm** will record your test projects from the `./projects` folder in the root `pnpm-lock.yaml` file. So you should not commit changes in that file unless you have changed dependencies of any of the core packages. If you need to commit it, move your projects out of the `./projects` folder temporarily and run `pnpm install` in the root folder. pnpm will then regenerate the lock file with only core dependencies. Commit the file, move your projects back, and run `pnpm install` again to continue developing.

## Contributing to the docs

We are a strong believer that documentation is very important for any open-source projects. Gridmix uses, of course, Gridmix for its website and documentation.

1. If you want to add/modify any Gridmix documentation, go to the
   [docs folder on GitHub](https://github.com/gridmix/gridmix-website/tree/master/docs) and
   use the file editor to edit and then preview your changes.
2. GitHub then allows you to commit the change and raise a PR right in the UI. This is the _easiest_ way you can contribute to Gridmix!

You can also clone [the Gridmix website repo](https://github.com/gridmix/gridmix-website) and work locally on documentation. Install it like any other Gridmix project.

## Contributing to the blog

Creating guest blog posts for Gridmix website users is a great way to contribute to Gridmix community. A typical blog post could be: **How our company is using Gridmix to do XX**, or **How to integrate XX with Gridmix**.

To add a new blog post to the gridmix.github.io blog:

**Prepare repository:**

- Clone [the Gridmix website repo](https://github.com/gridmix/gridmix-website).
- Run `yarn` to install all of the website's dependencies.
- Run `gridmix develop` to preview the blog at `http://localhost:8000/blog/`.
- The content for the blog lives in the `/blog` folder.

**Create your contributor profile:**
- Add your avatar image to `/contributors/images`.
- Add your name and info to `/contributors/contributors.yaml`.

**Setup blog post:**
- Add a new folder following the pattern `/blog/yyyy-mm-dd-title` (for example, 2018-09-14-say-hello-to-gridmix). Within this newly created folder add an `index.md` file.
- Add `title`, `date`, `author`, and `tags` to the frontmatter of your `index.md`.
- If your blog post contains images add them to your blog post folder and reference them in your post's `index.md`.
- Ensure any links to **gridmix.github.io pages** are relative links - `/docs/how-to-contribute/` instead of `https://gridmix.github.io/docs/how-to-contribute/`
- Commit and push to your fork
- Create a pull request from your branch
  - We recommend using a prefix of `docs`, like `docs/your-change`.

## Submit a Starter

Contributing a new starter project is a great way to help other Gridmix users to get off the ground quickly. If you want to list your project as an "official" Starter, you must commit the appropriate entry inside the Gridmix website repo.

To add your Starter to gridmix.github.io:

**Prepare repository:**

- Clone [the Gridmix website repo](https://github.com/gridmix/gridmix-website).
- Run `yarn` to install all of the website's dependencies.

**Create your contributor profile:**
- Add your avatar image to `/contributors/images`.
- Add your name and info to `/contributors/contributors.yaml`.

**Add your starter project:**
- Add starter screenshot to `/starters/screenshots` (840x840px / 1680x1680 for retina).
- Add starter details to end of this file `/starters/starters.yaml`.

**Recommendations to your Starter project**

- Naming convention: `gridmix-starter-<YOUR PROJECT SUFFIX>`
- Add Netlify [build settings](https://gridmix.github.io/docs/deploy-to-netlify/) to support "Install now" with Netlify directly out of our Starters section
- Your project README is automatically used as Starter description

**Committing your Starter**

- Run `gridmix develop` to preview starter at `http://localhost:8000/starters/`.
- Commit and push to your fork
- Create a pull request from your branch

## Submit to Showcase *

*Coming soon...*
