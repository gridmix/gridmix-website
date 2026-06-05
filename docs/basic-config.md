# Basic config

Every Gridmix project has a `/gridmix.config.js` file. This is where plugin options and global projects settings are located.

[For complete config API go here](/docs/config/)

```js
module.exports = {
  siteName: 'Gridmix',
  siteUrl: 'https://gridmix.github.io',
  siteDescription: 'The meta description for homepage',
  titleTemplate: '%s - Gridmix',
  icon: 'src/favicon.png',

  plugins: [
    // list plugins
  ],
}
```
