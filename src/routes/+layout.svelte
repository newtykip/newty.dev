<script lang="ts">
	import "../app.css";
	import { title, description, icon } from "../lib/stores";
</script>

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

<slot />
