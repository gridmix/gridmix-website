<template>
  <div class="logo" @contextmenu="rightClick" oncontextmenu="return false;">
    <g-link class="logo__link" to="/" title="Back to home">
      <g-image src="~/assets/images/gridmix-logo.png" class="logo__svg hide-for-small logo__svg--small" alt="Gridmix website" />
      <span class="hide-for-small logo__title">Gridmix</span>
      <g-image src="~/assets/images/gridmix-logo.png" class="logo__svg show-for-small logo__svg--small" alt="Gridmix website" />
    </g-link>
  </div>
</template>

<script>
import Logo from '~/assets/images/gridmix-logo.png'
import LogoSmall from '~/assets/images/gridmix-logo.png'
export default {
  components: {
    Logo,
    LogoSmall
  },
  methods: {
    rightClick() {
      this.$router.push({ path: '/logo' })
      return false
    }
  }
}
</script>

<style lang="scss">
 .logo {
   &__link {
     display: flex;
     align-items: center;
     justify-content: center;
     gap: 8px;
     text-decoration: none;
   }

  &__svg{
  	max-width: 130px;
  	height: auto;
    margin-bottom: 0;
    margin-top: -5px;
    &--small {
      max-width: 25px;
      &.show-for-small {
        margin-top: 0;
      }
    }
  }
   &__title {
     margin-top: -5px;
     font-size: 24px;
     font-weight: bold;
   }
 }
</style>
