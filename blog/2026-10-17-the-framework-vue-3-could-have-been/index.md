---
title: "Vue 2.8: the framework Vue 3 could have been"
slug: the-framework-vue-3-could-have-been
author: [fyodorio]
date: 2026-10-17
tags: ['vue', 'design']
excerpt: 'What if we had fixed Vue 2 instead of replacing it?'
---

> "We all want progress. But progress means getting nearer to the place where you want to be. And if you have taken a wrong turning, then to go forward does not get you any nearer. If you are on the wrong road, progress means doing an about-turn and walking back to the right road; and in that case the man who turns back soonest is the most progressive."
>
> C. S. Lewis

I recently rewatched the Vue documentary from CultRepo, which is very nostalgic and inspiring. It brings back the memories of the Vue 2 times when this framework was a symbol of openness and creativity of the JavaScript web development, with its emphasis on developer experience, simplicity, and comprehensive documentation. Interestingly, the documentary refers to [the notorious AngularJS to Angular 2 migration](https://www.youtube.com/watch?v=OrxmtDw4pVI&t=1139s) nightmare in derogatory way but at the same time Evan You had created the nightmare of their own with Vue 2 to Vue 3 transition — practically following the template of the Angular team's disaster. During the latter, as some grannies can recall, developers who loved the intuitive ease-of-use and simplicity of Angular 1 felt completely abandoned by Angular 2. Vue came around at the perfect time to capture those migratory developers by offering the strength of React combined with the low barrier to entry of early Angular. And yet again — the framework had stepped on the same rake leaving developers who probably just started to rehab from the trauma to [suffer the same betrayal again](https://www.youtube.com/watch?v=F2koGTRw5yk&t=363s).

Vue 2 officially [reached its End of Life](https://blog.vuejs.org/posts/vue-2-eol) on December 31, 2023 which is quite a while ago. There are practically no traces of that in modern world of grown and fantastic Vue 3. For what it's worth, it was an opinionated and contradictory evolution. Composition API solved real problems, for sure, but it also solved problems Vue 2 developers didn't have, at the cost of a model they really liked. What if the next Vue had been an honest continuation instead of the Hulk-like instant mutation? What if Vue 2 had simply gone on — 2.8, 2.9 — with the tools we have now, the same simple DSL, and a little more room to breathe?

This post is a modest nostalgic (_and, let's face it, slightly melancholic_) attempt to look at this probabilistic scenario in a [butterfly-effect-like way](https://en.wikipedia.org/wiki/The_Butterfly_Effect), without any didactic plea for revival. There's no specific reference to the Gridmix project here (_that still sits on Vue 2 as a small monument to the warm past, but may well move to Vue 3 someday soon_) but it's needless to say Gridmix loves Vue and not indifferent to that topic, especially in the context of lazily-ongoing update of dependencies and infrastructure.

## Hey, Number Three, what have you done?

The main goals of Vue 3 changes were to open the door to better framework performance, and to balance the readability against scalability story. Vue 2's component was basically a kind of a slightly creased paper page you could easily read. Vue 3 asked you to redesign the page and wrap it into a solid transparent plastic in order to deserve (and withstand) the scale demands.

The grand rewrite (which it was) was sore: `Object.defineProperty` is out, Proxies are in, a new renderer, a new way to start an app, a [big list of breaking changes](https://v3-migration.vuejs.org/breaking-changes/) for a framework people chose because it was small. Even [the compatibility build](https://v3-migration.vuejs.org/migration-build) shrugged at the libraries that had grown into Vue 2's habitual cozy hand-made furniture. For Vuetify, Nuxt, Vuex the migration became a challenge for years (sometimes), not a chilly summer sprint. Vue 3 shipped in September 2020, [became the default](https://blog.vuejs.org/posts/vue-3-as-the-new-default) only in February 2022, and Nuxt 3 and Vuetify 3 [called themselves stable](https://blog.vuejs.org/posts/2022-year-in-review) in November 2022.

Developers felt some form of doubt often, calling the new major version [a mistake not to repeat](https://medium.com/js-dojo/vue-3-was-a-mistake-that-we-should-not-repeat-81cc65484954), [the wrong solution to a real problem](https://dev.to/martinsotirov/vue-3-composition-api-the-wrong-solution-to-the-right-problem-1j6h), and eyerolling on AngularJS EOL-LTS vultures rubbing their hands over another [quick win](https://www.herodevs.com/blog-posts/what-it-really-takes-to-migrate-from-vue-2-to-vue-3). The framework creator himself [walked through the break](https://www.youtube.com/watch?v=Vp5ANvd88x0&t=1448s) in a positive way while being more candid at (rarely cited) Vue Fes Japan 2023: too many breaking changes in one release, the ecosystem underestimated, too much shipped at once, and so on. The migration he had watched Angular inflict, he later described in his own project — isn't it a kind of a daydream irony?!

## What Vue 2 got right

Vue 2's charm was never that it was the fastest thing in the room (though it was kinda OK anyway, that's for sure). It was that a component felt like a small, easily-readable, honest contract with the author — and no small-font paragraphs in the end. `this` was a comprehensive skeleton, options were a concise schema, a component was easily "greppable" even with a tired mind — like a hand-drawn pirate map from your childhood, with `data`, `computed`, `methods`, `watch`, `mounted` as familiar islands you always know how to navigate through. You did not invent a private topology of nested functions and hope the next reader would reverse-engineer your taste — you just put state where state lived, derived values where derived values lived, and side effects where side effects were allowed to stand.

As for the template, it was warm DX, if the phrase still means anything, where a new person opening a `.vue` file knows exactly where to look without a guided tour of `setup()` folklore (Gridmix still feels like that for me and I cry when I think of the inevitable migration). Take a static site, or a modest admin screen, or a marketing page with a few interactive "islands" — none of that should require a composition seminar before the first button works. Mixins were imperfect and still, in their way, brilliant: list a behavior, and its pieces appeared on `this` as if they had always lived around. Vuex was stern and somewhat ceremonial, but it was _one_ story about shared state, not a bazaar of patterns that each team re-derived from blog posts or whatnot. In conjunction with the low-entry-barrier documentation, that all was quite controllable and very humane.

Of course, all of that not without some significant tradeoffs, with implicit mixings intermixing, getter/setter reactivity holes bigger than the ones in our feet after using them, huge options object when a screen grew with adult responsibilities, alluring but poorly reachable TypeScript, performance "inefficiencies"... We all have sins, haven't we? But those sins didn't necessarily ask for a new religion. Better tools at most, at least for most of us — especially as the tools were already on their way, like new bundlers, language servers proliferation, compilers all around, and so many more. So let's attempt to imagine, what if the history would give us this gift of better tools?

## Under the hood of the fantasy

Same habits. Faster underneath. A little more flexible. Not a new animal.

- **Signals under the hood, `this` on the surface.** You still write `this.count++`. Something finer than a blunt re-render notices. Solid showed the mood; Vue itself later went looking, and called the expedition Vapor. In this timeline it arrives as an implementation detail, not a new API to learn.
- **A Vapor-style compiler, much less VDOM diffing.** The template was always a gift to a compiler. Svelte and Solid compiled their way out of the diff; Vue eventually [sketched the same wish](https://blog.vuejs.org/posts/2022-year-in-review). Here it is just how a Vue 2.8 template renders. The script-tag runtime stays, for the pages that don't want a build step. The compiler is a kindness. The runtime is the framework.
- **Typed pipes instead of deleted filters.** `{{ price | currency }}` was a small joy. Vue 3 threw filters out ([removed](https://v3-migration.vuejs.org/breaking-changes/filters)) and told you to call a method. Angular grew the same idea into pipes instead of mourning it. 2.8 keeps the pipe, gives it an import and a type, and lets the compiler fold it in. Presentation stays in the template, where it was readable.
- **Mixins stay. Composables if you want them.** A mixin is implicit on purpose: you list it, and its `data`, `computed`, `methods`, and hooks show up on `this` as if they had always lived there. That is the habit. You write `this.formatDate` and you are done. The trouble was never the implicitness. It was a collision you cannot see — two guests both bring `loading`, the merge quietly picks a winner, and six months later the component file does not contain the word. A "behavior," if the daydream wants one, is only a mixin with its name still on the guest list, so devtools can point when two of them brought the same key. If that label feels like paperwork, skip it. Plain mixins already are the romantic feature. Composables remain a side door for the helper used by forty screens, with its own watchers, that you want to call twice in one component. Useful. Not the front door. Not the identity.
- **`asyncData` instead of Suspense.** Nuxt 2 already had the humane version: a place on the page that says what data it needs, then merges it into the component you already understand ([async data](https://nuxt.com/docs/2.x/getting-started/data-fetching)). Vue 3 reached for `<Suspense>` and left it experimental. The kinder branch lifts the thing people already liked.
- **Strict templates, still templates.** Angular type-checks its own DSL without turning it into TypeScript. `strictTemplates` looks at `{{ }}`, inputs, `$event`, `*ngFor` locals, and pipes, and the compiler does the translation behind the curtain so TypeScript can complain in the template ([how strict mode checks](https://angular.dev/tools/cli/template-typecheck)). Vue 2.8 could have the same kindness: a misspelled `this.count`, a prop of the wrong shape, a `v-for` item treated as a string when it is a post. The editor underlines the template. The author keeps writing the template. No TSX, no `setup()`, no new grammar to deserve types.
- **The nice extras, without a new identity.** Fragments. Teleport. A style block that can see component state — CSS `v-bind`, which even [found its way back into 2.7](https://blog.vuejs.org/posts/vue-2-7-naruto), proof that some delights fit the old house.
- **Faster tools, not a personality change.** The 2020s handed everyone a faster dev server. Vite, yes, but also Rspack, Parcel, Turbopack, esbuild, SWC — a whole generation of bundlers, many of them Rust, some Go, all of them mighty enough that "the build is slow" stopped being a reason to rewrite a framework. A language server could love a `.vue` file too. None of that required `setup()`. A Vue 2 that stayed could have taken the tools and remained itself.

## Performance, said softly

Nobody here is chasing a perfect score. Bearable would have been enough. Maybe even catching Vue 3, who knows — the [3.0 announcement](https://blog.vuejs.org/posts/vue-3-one-piece) was proud of its numbers, and a smarter compiler, signals, and that new generation of tools could have gone a long way without asking the author to change how a component feels.

The loss that stings isn't a benchmark. It's that "faster" became a reason to stop being the framework people loved, and to grow a fancy Angular-like performance machine instead.

## Meta-lesson

The question "what if we'd fixed it instead of replacing it" is worth asking, even for a framework you love. Especially then.

## Conclusion

Composition API made Vue more powerful and less itself. That trade may have been worth it for some teams. It was still a trade.

Evan could have done better, years ago. We might have had the good old framework now — quicker, kinder, still itself. A framework developers would actually love.
