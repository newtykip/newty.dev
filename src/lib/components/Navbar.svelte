<script lang="ts">
	import Domain from "$lib/components/Domain.svelte";
	import { links } from "$lib/consts";
</script>

<nav class="flex justify-between pt-8 text-xl">
	<div class="flex">
		<span class="text-2xl"><Domain /></span>
	</div>

	<div class="flex gap-10">
		{#each links as { nav, endpoint }}
			{#if nav}
				<a href="/{endpoint}" class="hover">{nav}</a>
			{/if}
		{/each}
	</div>
</nav>
