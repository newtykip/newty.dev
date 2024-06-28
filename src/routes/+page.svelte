<script lang="ts">
	import game from "$lib/stores/game";
	import starred from "$lib/stores/starred";
	import song from "$lib/stores/song";
	import { onMount } from "svelte";
	import watchMedia from "svelte-media";
	import Domain from "$lib/components/Domain.svelte";
	import { links } from "$lib/consts";

	const media = watchMedia({
		landscape: "(orientation: landscape)",
	})

	onMount(async () => {
		// cache about page data before it is needed
		await game;
		await starred;
		await song;
	});

	$: cat_open = false;
	$: taskbar_open = false;
	const toggle_cat = () => (cat_open = !cat_open);
	const toggle_taskbar = () => (taskbar_open = !taskbar_open);

	const key_down = (e: KeyboardEvent) => {
		switch (e.key) {
			case "Enter":
			case " ":
				toggle_taskbar();
				break;

			case "c":
				toggle_cat();
				break;
		}
	};
</script>

<main class="flex flex-col justify-center gap-0 pt-20">
	{#if $media.landscape}
		<button class="text-right cursor-pointer" on:click={toggle_cat} tabindex={-1}>
			{#if !cat_open}
				<p class="fill"></p>
			{/if}
			<p>.----------------.</p>
			<p>| |\__/,|   (`\  |</p>
			<p>| |_ _  |.--.) ) |</p>
			{#if cat_open}
				<p>| ( T   )     )  |</p>
			{/if}
		</button>

		<div class="flex">
			<button class="text-green cursor-pointer" on:click={toggle_taskbar} tabindex={-1}>
				<p>.----</p>
				<p>| {#if taskbar_open}-{:else}+{/if} |</p>
				<p>'----</p>
			</button>
			<div>
				<p>----------------.</p>
				<p class="font-bold">&nbsp;<Domain />      |</p>
				<p>----------------'</p>
			</div>
		</div>
		<div>
			{#each links as { endpoint, main }, i}
				{#if taskbar_open && main}
					<p>
						| {i} | <a class="text-green" href={`/${endpoint}`}>
							{main}
						</a>
						{" ".repeat(14 - main.length)}|
					</p>
				{:else if main}
					<p class="fill"></p>
				{/if}
			{/each}
			{#if taskbar_open}
				<p>'--------------------'</p>
			{:else}
				<p class="fill"></p>
			{/if}
		</div>
	{:else if $media.landscape === false}
		<div class="text-center">
			<button class="cursor-pointer mb-4" on:click={toggle_cat} tabindex={-1}>
				<p>&nbsp;/\_/\</p>
				<p>
					&nbsp;{#if cat_open}
						( o.o )
					{:else}
						( -.- )
					{/if}
				</p>
				<p>&nbsp;&gt; ^ &lt;</p>
			</button>
	
			<p class="font-semibold mb-7">
				<Domain />
			</p>
	
			{#each links as { endpoint, main }}
				{#if main}
					<p>
						<a href={`/${endpoint}`} class="text-green">
							{main}
						</a>
					</p>
				{/if}
			{/each}
		</div>
	{/if}
</main>

<svelte:body on:keydown={key_down} />

<style lang="postcss">
	p {
		@apply xl:text-5xl lg:text-6xl md:text-4xl text-3xl whitespace-pre mt-0 pt-0;
	}

	p.fill {
		@apply xl:min-h-12 lg:min-h-[3.75rem] md:min-h-9 min-h-[1.875rem];
	}
</style>
