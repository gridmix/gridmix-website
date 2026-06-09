<template>
  <aside class="fork-notice" aria-labelledby="fork-notice-title">
    <p class="fork-notice__eyebrow">Project context</p>

    <h2 id="fork-notice-title" class="fork-notice__title">
      Gridmix is an independent continuation of Gridsome
    </h2>

    <p>
      Gridmix revives and modernizes the MIT-licensed Gridsome static site
      generator, originally created by Tommy Vedvik and Hans-Jørgen Vedvik. The
      original project has been inactive since 2022; Gridmix is an independent
      fork and is not affiliated with or endorsed by the original Gridsome
      maintainers.
    </p>

    <p class="fork-notice__links">
      <a
        href="https://github.com/gridmix/gridmix"
        rel="noopener noreferrer"
        target="_blank"
      >
        Gridmix repository
      </a>
      <span aria-hidden="true">·</span>
      <a
        href="https://github.com/gridsome/gridsome"
        rel="noopener noreferrer"
        target="_blank"
      >
        Original Gridsome project
      </a>
    </p>
  </aside>
</template>

<style lang="scss">
.fork-notice {
  max-width: 760px;
  margin: var(--space-x2) auto 0;
  padding: var(--space);
  color: var(--body-color);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color-darker);
  border-left: 4px solid var(--primary-color);
  border-radius: var(--border-radius);
  text-align: left;
  transition: background-color .3s, border-color .3s, color .3s;

  &__eyebrow {
    margin-bottom: .35rem;
    color: var(--primary-color-dark);
    font-size: .75rem;
    font-weight: 600;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  &__title {
    margin-bottom: .75rem;
    font-size: 1.35rem;
  }

  &__links {
    display: flex;
    flex-wrap: wrap;
    gap: .35rem .6rem;
    font-size: .9rem;
  }

  @media screen and (max-width: 850px) {
    &__title {
      font-size: 1.15rem;
    }
  }
}
</style>
