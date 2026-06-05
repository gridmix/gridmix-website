<template>
	<div class="ecosystem">

		<h5 class="text-center">Gridmix Ecosystem</h5>

		<div class="ecosystem__cols grid-cols grid-cols--4">

			<Card class="ecosystem__item" link="/docs">
				<icon-docs />
				<h4>Docs</h4>
				<p>Get started with Gridmix and learn how to use it.</p>
			</Card>

			<Card class="ecosystem__item" link="/plugins">
				<icon-plugins />
				<h4>Plugins</h4>
				<p>Enhance your Gridmix site with amazing plugins.</p>
			</Card>

			<Card class="ecosystem__item" link="/starters">
				<icon-starters />
				<h4>Starters</h4>
				<p>Browse premade Gridmix projects to get started quickly.</p>
			</Card>

			<Card class="ecosystem__item" link="/blog">
				<icon-blog />
				<h4>Blog</h4>
				<p>Articles, tips & tricks from the Gridmix community.</p>
			</Card>

		</div>
	</div>
</template>

<script>
import IconPlugins from '@/assets/images/icon-plugins.svg'
import IconDocs from '@/assets/images/icon-docs.svg'
import IconStarters from '@/assets/images/icon-starters.svg'
import IconBlog from '@/assets/images/icon-blog.svg'

export default {
	components: {
		IconPlugins,
		IconDocs,
		IconStarters,
		IconBlog
	}
}
</script>

<style lang="scss">
	.ecosystem {
		padding: calc(3% + 20px) 0 0;

		&__item {
			font-size: .9rem;

			svg {
				float: right;
				margin-top: -12px;
				margin-right: -10px;
			}
		}
	}
</style>
