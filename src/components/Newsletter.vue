<template>
	<Card class="newsletter">
		<p class="mb-half"><strong>👋 Stay in the loop.</strong> Subscribe to Gridmix newsletter!</p>
		<form
      action="https://buttondown.com/api/emails/embed-subscribe/gridmix"
      method="post"
      class="newsletter__form validate"
      target="_blank"
      novalidate>
		<div class="flex">
			<div class="newsletter__field flex-fit" style="margin-right: 15px">
				<input
          type="email"
          aria-label="Email"
          placeholder="your@email.com"
          value=""
          name="email"
          class="required email"
          id="bd-email">
			</div>

			<div class="newsletter__button">
				<button
          type="submit"
          value="Subscribe"
          class="button primary">
					Subscribe
				</button>
			</div>
	   </div>
		</form>
		<div class="newsletter__top"></div>
	</Card>
</template>

<style lang="scss">
.newsletter {

  &__top {
  	height: 4px;
  	position: absolute;
  	top:0;
  	left:0;
  	right:0;
  	background: linear-gradient(90deg, var(--primary-color) 0%, #8ED6FB 50%, #D32E9D 100%);
  }

  &__form {
  	margin-bottom:0;
  }
  &__field {
  	min-width: 200px;
  	margin-bottom: 1rem;
  }
  &__button {
  	margin: 0 auto;
  	margin-bottom: 1rem;
  }

  p {
  	margin-bottom: .5rem;
  }
}
</style>
