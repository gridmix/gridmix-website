---
title: Use Markdown for data
filepath: gridmix.config.js
filetype: js
order: 4
---
```js
module.exports = {
  siteName: 'My Markdown Blog',
  siteDescription: 'Gridmix 💚 Markdown',
  plugins: [
    {
      // Example usage of Markdown for content
      use: '@gridmix/source-filesystem',
      options: {
        path: 'posts/**/*.md', // What files to use
        typeName: 'Post', // GraphQL type name
        refs: {
          // Create relation between a "tags" field.
          tags: {
            typeName: 'Tag',
            create: true
          }
        }
      }
    },
  ],
  // Setup templates & routes for the collection.
  // This will look for src/templates/{Collection}.vue and use that.
  templates: {
    Post: '/blog/:year/:month/:title',
    Tag: '/tags/:title'
  }
}
```
