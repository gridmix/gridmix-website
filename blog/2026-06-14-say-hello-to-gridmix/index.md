---
title: Say hello to Gridmix 🐦‍🔥💚
slug: say-hello-to-gridmix
author: [fyodorio]
date: 2026-06-14
tags: ['meta', 'build in public']
excerpt: 'Gridmix is a revival fork of Gridsome aiming to resurrect the warm and fuzzy feeling around building static websites with less hassle and more satisfaction.'
---

Gridsome, the static site generator for Vue.js based on Webpack and Babel, was born roughly eight years ago and (*let's face it*) died four years later at the dawn of the Vue 3 and Vite era. Many people (*myself included*) struggled to accept that, but time has shown there were only two real choices: stay and suffer the ecosystem rot, or migrate to [some alternative project](https://fyodor.io/migration-from-gridsome-to-astro/).

I eventually chose the former and, up until recently, lived with it quite well, taking into account the modest requirements of [my personal Gridsome-based website](https://fyodor.io). I used Bun to [keep the project alive](https://fyodor.io/how-bun-can-help-to-revive-a-gridsome-project/) and tried to find some bearable HTML+CSS+JS alternative in parallel.

Long story short, I failed (*Astro is too hyperactive, Jekyll is too Ruby, Hugo is too Go, and so on*) and dealing with Bun had become [quite depressing](https://github.com/yt-dlp/yt-dlp/issues/16766) lately, so one weekend day I decided to check how hard it would be to update Gridsome for Node LTS and modernized dependencies, preserving the same simplicity philosophy at the same time.

So that's how I came to this fork, and so far it works well for me, given that the updated alpha version supports two websites already: [this docs project](https://gridmix.github.io) and my actual [personal website](https://fyodor.io).

My goals with Gridmix (_Gridsome + Remix = Gridmix_) are to at least avoid migrations for the latter in the foreseeable future and to maintain a healthy ecosystem to avoid the ubiquitous security problems `npm` brought in recent years (*or even days*).

If you have any feedback/suggestions, please provide it through [the core repository issues](https://github.com/gridmix/gridmix/issues), my [personal socials](https://fyodor.io/links), or via [ping@fyodor.io](mailto:ping@fyodor.io). 
