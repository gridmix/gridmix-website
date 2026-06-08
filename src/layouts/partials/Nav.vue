<template>
  <nav class="main-nav flex gap-15">
    <g-link to="/docs/">
      <span class="main-nav__label">Docs</span>
    </g-link>

    <g-link to="/starters/">
      <span class="main-nav__label">Starters</span>
    </g-link>

    <g-link to="/plugins/">
      <span class="main-nav__label">Plugins</span>
    </g-link>

    <g-link to="/blog/">
      <span class="main-nav__label">Blog</span>
    </g-link>
  </nav>
</template>


<style lang="scss">
.main-nav {
  flex-wrap: nowrap;
}

@media screen and (max-width: 850px) {
  .main-nav.gap-15 > * {
    margin-right: 10px;
  }
}

@media screen and (max-width: 600px) {
  .main-nav.gap-15 > * {
    margin-right: 6px;
  }
}
</style>
