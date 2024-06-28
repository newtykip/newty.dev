<script lang="ts">
	import { page } from "$app/stores";
	import "../app.css";
	import { title, description, icon } from "$lib/stores/index";
	import theme from "$lib/stores/theme";
	import colour from "$lib/stores/colour";
	import Navbar from "$lib/components/Navbar.svelte";
	import { ArrowLeft, ArrowRight } from "lucide-svelte";
	import { classList } from "svelte-body";

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

<svelte:body use:classList={`${$theme} bg-base text-text`} />

<div class="flex flex-col justify-between min-h-screen">
	{#if $page.url.pathname != "/"}
		<Navbar />
	{/if}

	<div class="flex-grow">
		<slot />
	</div>

	<footer class="text-center text-xl my-10">
		<div class="mb-2">
			<a class="hover:text-red" href="https://ctp-webr.ing/newt/previous"><ArrowLeft /></a>
			<a href="https://ctp-webr.ing/">catppuccin webring :3</a>
			<a class="hover:text-green" href="https://ctp-webr.ing/newt/next"><ArrowRight /></a>
		</div>

		<div class="flex justify-center gap-4">
			<button class="hover:cursor-pointer" title="latte" on:click={() => theme.set("latte")}>🌻</button>
			<button class="hover:cursor-pointer" title="frappe" on:click={() => theme.set("frappe")}>🪴</button>
			<button class="hover:cursor-pointer" title="macchiato" on:click={() => theme.set("macchiato")}>🌺</button>
			<button class="hover:cursor-pointer" title="mocha" on:click={() => theme.set("mocha")}>🌿</button>
		</div>

		<!-- <select class="bg-base inline" bind:value={$theme}>
			<option value="latte">latte</option>
			<option value="frappe">frappe</option>
			<option value="macchiato">macchiato</option>
			<option value="mocha">mocha</option>
		</select> -->
	</footer>
</div>
