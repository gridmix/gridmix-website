const nodeExternals = require('webpack-node-externals')

module.exports = {
  siteName: 'Gridmix',
  siteUrl: `https://gridmix.github.io/`,
  titleTemplate: '%s - Gridmix',
  siteDescription: 'Gridmix is a free & open source Vue.js-powered framework for building websites & apps that are fast by default 🚀.',

  chainWebpack(config, { isServer }) {
    // --- Gridmix ERRATA: silence harmless sass.dart.js "Critical dependency" warning ---
    config.merge({
      ignoreWarnings: [
        {
          module: /node_modules[/\\]sass[/\\]sass\.dart\.js/,
          message: /Critical dependency/
        }
      ]
    })

    config.module.rules.delete('svg')
    config.module.rule('svg')
      .test(/\.svg$/)
      .use('vue')
      .loader('vue-loader')
        .end()
      .use('svg-to-vue-component')
      .loader('svg-to-vue-component/loader')

    if (isServer) {
      config.externals(nodeExternals({
        whitelist: [
          /\.css$/,
          /\?vue&type=style/,
          /typeface-league-spartan/
         ]
      }))
    }
  },

  templates: {
    BlogPost: '/blog/:year/:month/:day/:slug',
    Contributor: '/contributor/:id',
    Starter: '/starters/:title',
    Platform: '/starters/platform/:id'
    // NOTE: no `Example` template — examples are rendered inline by
    // src/components/Examples.vue via the `allExample` static-query, not as
    // standalone pages, and there is no src/templates/Example.vue. Declaring a
    // template here makes `gridmix build` fail requiring that component.
  },

  plugins: [
    /** TODO: resurrect properly */
    /*{
      use: '@gridmix/plugin-google-analytics',
      options: {
        id: 'UA-127625720-1'
      }
    },*/
    {
      use: '@gridmix/plugin-critical',
      options: {
        paths: ['/'],
        width: 1300,
        height: 900
      }
    },
    {
      use: '@gridmix/vue-remark',
      options: {
        index: ['README'],
        baseDir: './docs',
        pathPrefix: '/docs',
        typeName: 'DocPage',
        template: './src/templates/DocPage.vue',
        plugins: [
          '@gridmix/remark-prismjs'
        ],
        remark: {
          autolinkHeadings: {
            content: {
              type: 'text',
              value: '#'
            }
          }
        }
      }
    },
    {
      use: '@gridmix/source-filesystem',
      options: {
        path: 'examples/*.md',
        typeName: 'Example',
        remark: {
          plugins: [
            '@gridmix/remark-prismjs'
          ]
        }
      }
    },
    {
      use: '@gridmix/source-filesystem',
      options: {
        typeName: 'BlogPost',
        path: './blog/*/index.md',
        refs: {
          author: 'Contributor'
        },
        remark: {
          plugins: [
            '@gridmix/remark-prismjs'
          ]
        }
      }
    }
  ],

  css: {
    loaderOptions: {
      scss: {
        implementation: require('sass')
      },
      sass: {
        implementation: require('sass'),
        sassOptions: {
          indentedSyntax: true
        }
      }
    }
  }

}
