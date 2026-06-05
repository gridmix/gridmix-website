# Gridmix Netlify CMS Guide

## Prerequisites

We assume you've worked with `@gridmix/source-filesystem` and `@gridmix/transformer-remark` before this guide.

Gridmix requires **Node.js** and recommends **pnpm**. [How to setup](https://gridmix.github.io/docs/prerequisites)

## Create a Gridmix project

1. `gridmix create my-gridmix-site` to create a new project
2. `cd my-gridmix-site` to open folder
3. `gridmix develop` to start local development server

## Install the required dependencies

Gridmix already provides you a set of [plugins](https://gridmix.github.io/plugins) to get you started.

- `yarn add netlify-cms gridmix-plugin-netlify-cms @gridmix/source-filesystem @gridmix/transformer-remark` to install the required dependencies
- `npm add netlify-cms gridmix-plugin-netlify-cms @gridmix/source-filesystem @gridmix/transformer-remark`

## Configuration

Alright, the plugins are installed, it's now time to setup the right configuration. Open the `gridmix.config.js` file and make sure it looks like this:

```js
module.exports = {
  siteName: 'Gridmix',
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        // ...global plugins
      ]
    }
  },

  plugins: [
    {
      use: '@gridmix/source-filesystem',
      options: {
        path: 'posts/**/*.md',
        typeName: 'Post',
        remark: {
          plugins: [
            // ...local plugins
          ]
        }
      }
    },
    {
      use: `gridmix-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`,
        modulePath: `src/admin/index.js`
      }
    },
  ]
}
```

Please read [gridmix-plugin-netlify-cms](https://gridmix.github.io/plugins/gridmix-plugin-netlify-cms), [transformer-remark](https://gridmix.github.io/plugins/@gridmix/transformer-remark) for more information about the configurations.

## Netlify CMS setup

It's time to add the CMS!

1. Create an `admin` directory inside the `src`
2. Create an `uploads` directory inside the root of your project
3. Add `index.html`, `index.js` and a `config.yml` file to your `admin` directory

Your `index.html` should look like this:

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Netlify CMS</title>
</head>
<body>
  <script src="index.js" type="module"></script>
</body>
</html>
```

Your `index.js` should look like this:

```js
import CMS from "netlify-cms"
```

Your `config.yml` for GitHub should look like this:

```yml
backend:
  name: github
  repo: your_name/repo_name

media_folder: "static/uploads"
public_folder: "/uploads"

collections:
  - name: "posts"
    label: "Posts"
    folder: "posts"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Excerpt", name: "excerpt", widget: "string"}
      - {label: "Publish Date", name: "date", widget: "date"}
      - {label: "Body", name: "body", widget: "markdown"}
```

Your `config.yml` for Bitbucket should look like this:

```yml
backend:
  name: bitbucket
  repo: owner-name/repo-name # Path to your Bitbucket repository

# The rest of the configuration...
```

## Netlify CMS authentication with GitHub

Before we can start adding posts we'll have to give Netlify access to our GitHub, this part is **crucial**, please follow the steps closely. More info can be read [here](https://www.netlify.com/docs/authentication-providers/);

Part 1, GitHub:

1. Open [this](https://github.com/settings/developers) link
2. Click on "New OAuth App"
3. Fill in all the fields according to your website and use `https://api.netlify.com/auth/done` as `authorization` callback URL

Part 2, Netlify:

1. Go to your Netlify dashboard and click on your project
2. Navigate to Settings > Access control > OAuth
3. Under Authentication Providers, click Install Provider
4. Select GitHub and enter the Client ID and Client Secret, then save ([0Auth Docs - How do I find my GitHub client ID and secret?](https://auth0.com/docs/connections/social/github#3-get-your-github-app-s-client-id-and-client-secret))

## Netlify CMS authentication with Bitbucket

Another way of integration Netlify CMS could be with the Bitbucket OAuth. Please follow the steps closely. At the moment, there is a lack of support for Editorial Workflow when working with Bitbucket [Bitbucket Editorial Workflow](https://www.netlifycms.org/docs/add-to-your-site/#editorial-workflow);

Part 1, Bitbucket:

1. Open [this](https://bitbucket.org/account/user) link
  1.1 Under **ACCESS MANAGEMENT** find OAuth link, and open it
2. Scroll to "OAuth consumers" and click on the button "Add consumer"
3. Fill in all the fields according to your website and use `https://api.netlify.com/auth/done` as `authorization` callback URL
4. Upon creation you will get the Key and Secret which will be used in Netlify

Part 2, Netlify:

1. Go to your Netlify dashboard and click on your project
2. Navigate to Settings > Access control > OAuth
3. Under Authentication Providers, click Install Provider
4. Select Bitbucket, and enter the Client ID and Client Secret from step 4 in Part 1, Bitbucket. Then click install

## Start coding

Your basic blog scaffold is done, now you can query data from the GraphQL server just like you're working with the filesystem. For more info read [querying data](https://gridmix.github.io/docs/querying-data).
