<script lang="ts">
	import { page } from "$app/stores";
	import "../app.css";
	import { title, description, icon } from "$lib/stores/index";
	import colour from "$lib/stores/colour";
	import Navbar from "$lib/components/Navbar.svelte";
	import { ArrowLeft, ArrowRight } from "lucide-svelte";

	const key_down = (e: KeyboardEvent) => {
		switch (e.key) {
			case "k":
				colour.next();
				break;

			case "j":
				colour.back();
				break;
		}
	};
</script>

<svelte:window on:keydown={key_down} />

<svelte:head>
	<meta name="title" content={$title} />
	<meta name="description" content={$description} />

	<meta property="og:type" content="website" />
	<meta property="og:title" content={$title} />
	<meta property="og:description" content={$description} />
	<meta property="og:image" content="/{$icon}" />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content={$title} />
	<meta property="twitter:description" content={$description} />

	<title>{$title}</title>
</svelte:head>

<div class="flex flex-col justify-between min-h-screen">
	{#if $page.url.pathname != "/"}
		<Navbar />
	{/if}

	<div class="flex-grow">
		<slot />
	</div>

	<footer class="text-center text-xl my-10">
		<a class="hover:text-red" href="https://ctp-webr.ing/newt/previous"><ArrowLeft /></a>
		<a href="https://ctp-webr.ing/">catppuccin webring :3</a>
		<a class="hover:text-green" href="https://ctp-webr.ing/newt/next"><ArrowRight /></a>
	</footer>	
</div>
