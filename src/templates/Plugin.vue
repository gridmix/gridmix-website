<template>
  <Layout :footer="false">
    <div class="plugins container flex flex-align-top" style="position: relative;">

      <div class="sidebar plugins__sidebar">
        <div class="plugins__search">
          <div class="plugins__search-box">
            <input
              v-model="query"
              class="plugins__search-input"
              type="search"
              placeholder="Search for Gridmix plugins"
            />
          </div>
          <div class="flex flex-space-between">
            <span class="plugins__count small">{{ filteredPlugins.length }} plugins</span>
          </div>
        </div>

        <ul class="plugins__list">
          <li
            v-for="item in filteredPlugins"
            :key="item.name"
            class="plugin"
            :class="hitClasses(item)"
          >
            <span class="plugin__name">{{ item.name }}</span>
            <span class="plugin__description">{{ item.description }}</span>
            <g-link class="plugin__link" :to="`/plugins/${item.name}`">
              Read more about {{ item.name }}
            </g-link>
          </li>
        </ul>
      </div>

      <Section class="plugin-post" container="md">
        <template v-if="isSingle">
          <div class="plugin-post__meta" v-if="hit">
            <div class="plugin-post__meta_left">
              <div class="plugin-post__users">
                <a href="https://www.npmjs.com/org/gridmix" target="_blank" rel="noopener">
                  <img class="plugin-post__users-image" src="https://avatars.githubusercontent.com/u/285744248?s=200&v=4" alt="gridmix" />
                  <span class="plugin-post__users-name">
                    gridmix
                    <i class="plugin-post__users-tag">Official Plugin</i>
                  </span>
                </a>
              </div>
            </div>
            <div class="plugin-post__meta_right">
              <a
                rel="noopener noreferrer"
                target="_blank"
                v-if="hit.repository" :href="hit.repository"
                title="View on GitHub"
                aria-label="View on GitHub"
                class="button button--blank">
                <GitHubLogo />
              </a>
              <a
                rel="noopener noreferrer"
                target="_blank"
                :href="`https://www.npmjs.com/package/${hit.name}`">
                View on npm
              </a>
            </div>
          </div>

          <div class="plugin-post__content mb" v-if="content" v-html="content" />

        </template>
        <template v-else>
          <div class="plugins-intro container-sm post">
            <Connect />
            <div class="plugins-intro__text">
              <h1>Gridmix Plugins</h1>
              <p class="lead">Gridmix plugins are NPM packages that you can install to any project. <span class="hide-for-small">Use the search bar to the left to find a plugin.</span></p>

              <p>Want to contribute to plugins library? <g-link to="/docs/how-to-create-a-plugin">Learn how to build a plugin</g-link></p>
            </div>
          </div>
        </template>
      </Section>
     </div>
  </Layout>
</template>

<script>
import markdown from '../utils/markdown'
import GitHubLogo from '~/assets/images/github-logo.svg'
import Connect from '~/components/Connect.vue'

// NOTE: Plugin discovery originally came from Algolia's public `npm-search`
// index, filtered by `keywords:gridmix-plugin AND deprecated:false` (same
// approach as the upstream gridsome.org I forked). After switching the npm
// scope from `@gridsome` to `@gridmix`, the scoped packages were never picked
// up by that public mirror — every `@gridmix/*` package 404s in npm-search
// (only the unscoped `gridmix` package got indexed), so the dynamic list came
// back empty. The credentials are fine; it's the third-party index I don't
// control. Until/unless the `@gridmix/*` packages get indexed there, I ship
// the curated static list below.
// TODO: revisit going back to Algolia/npm-search-driven discovery (or stand up
// our own index) once the @gridmix/* packages appear in the npm-search index.
const PLUGINS = [
  {
    name: '@gridmix/source-filesystem',
    description: 'Filesystem source for Gridmix',
    repository: 'https://github.com/gridmix/gridmix/tree/main/packages/source-filesystem'
  },
  {
    name: '@gridmix/transformer-remark',
    description: 'Markdown transformer for Gridmix',
    repository: 'https://github.com/gridmix/gridmix/tree/main/packages/transformer-remark'
  },
  {
    name: '@gridmix/vue-remark',
    description: 'Use Vue Components in Markdown',
    repository: 'https://github.com/gridmix/gridmix/tree/main/packages/vue-remark'
  },
  {
    name: '@gridmix/remark-prismjs',
    description: 'Syntax highlighter for markdown code blocks',
    repository: 'https://github.com/gridmix/gridmix/tree/main/packages/remark-prismjs'
  },
  {
    name: '@gridmix/plugin-google-analytics',
    description: 'Google Analytics plugin for Gridmix',
    repository: 'https://github.com/gridmix/gridmix/tree/main/packages/plugin-google-analytics'
  },
  {
    name: '@gridmix/plugin-critical',
    description: 'Extracts and inlines critical-path (above-the-fold) CSS',
    repository: 'https://github.com/gridmix/gridmix/tree/main/packages/plugin-critical'
  }
]

// Turn a GitHub "tree" URL (…/gridmix/tree/main/packages/x) into the raw README
// URL (…/raw.githubusercontent.com/gridmix/main/packages/x/README.md). Returns
// null for any non-GitHub repository so we just render no content rather than
// fetching a bad URL.
function readmeUrlFor (repository) {
  if (!repository || !repository.includes('github.com') || !repository.includes('/tree/')) {
    return null
  }

  return repository
    .replace('https://github.com/', 'https://raw.githubusercontent.com/')
    .replace('/tree/', '/') + '/README.md'
}

export default {
  components: {
    Connect,
    GitHubLogo
  },

  data () {
    return {
      hit: null,
      query: '',
      readme: ''
    }
  },

  computed: {
    isSingle () {
      return Boolean(this.$route.params.id)
    },

    filteredPlugins () {
      const q = this.query.trim().toLowerCase()

      if (!q) return PLUGINS

      return PLUGINS.filter(plugin =>
        plugin.name.toLowerCase().includes(q) ||
        plugin.description.toLowerCase().includes(q)
      )
    },

    content () {
      return this.readme ? markdown(this.readme) : ''
    }
  },

  watch: {
    $route: {
      handler: 'fetchCurrent',
      immediate: true
    }
  },

  metaInfo () {
    const meta = {
      title: 'Plugins',
      meta: []
    }

    if (this.hit) {
      meta.title = this.hit.name

      if (this.hit.description) {
        meta.meta.push({
          key: 'description',
          name: 'description',
          content: this.hit.description
        })
      }
    }

    return meta
  },

  methods: {
    async fetchCurrent () {
      this.readme = ''

      if (!this.isSingle) {
        this.hit = null
        return
      }

      const { id: name } = this.$route.params
      this.hit = PLUGINS.find(plugin => plugin.name === name) || null

      // Render the README straight from GitHub raw (derived from the repository
      // URL below). The npm registry doesn't populate a `readme` field for these
      // packages, and the old Algolia npm-search index that used to supply it
      // never indexed the @gridmix/* scope (see the note at the top of this file).
      // Client-only; raw.githubusercontent.com sends permissive CORS.
      const readmeUrl = this.hit && readmeUrlFor(this.hit.repository)

      if (readmeUrl && process.isClient) {
        try {
          const res = await fetch(readmeUrl)
          this.readme = res.ok ? await res.text() : ''
        } catch (err) {
          this.readme = ''
        }
      }
    },

    hitClasses (hit) {
      return {
        'plugin--active': this.hit && this.hit.name === hit.name
      }
    }
  }
}
</script>
