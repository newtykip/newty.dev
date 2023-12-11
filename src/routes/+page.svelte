<script lang="ts">
	import game from "$lib/stores/game";
	import starred from "$lib/stores/starred";
	import urls from "$lib/urls";
	import { onMount } from "svelte";
	import watchMedia from "svelte-media";

	const media = watchMedia({
		landscape: "(orientation: landscape)",
	})

	onMount(async () => {
		// cache about page data before it is needed
		await game;
		await starred;
	});

	const socials = [
		{
			name: "About Me",
			url: "/about",
			external: false
		},
		{
			name: "Projects",
			url: "/projects",
			external: false
		},
		{
			name: "GitHub",
			url: urls.github,
			external: true
		},
		{
			name: "Discord",
			url: urls.discord,
			external: true
		},
		{
			name: "Steam",
			url: urls.steam,
			external: true
		},
		{
			name: "Twitch",
			url: urls.twitch,
			external: true
		},
		{
			name: "YouTube",
			urls: urls.youtube,
			external: true
		}
	];

	const colours = [
		"inherit",
		"#f38ba8", // RED
		"#eba0ac", // ORANGE
		"#f9e2af", // YELLOW
		"#a6e3a1", // GREEN
		"#74c7ec", // CYAN
		"#89b4fa", // BLUE
		"#cba6f7", // PURPLE
		"#f5c2e7" // PINK
	];

	let colour_index = 0;
	$: cat_open = false;
	$: taskbar_open = false;
	$: colour = colours[0];

	const toggle_cat = () => (cat_open = !cat_open);
	const toggle_taskbar = () => (taskbar_open = !taskbar_open);

	const shift_colour = (backwards: boolean = false) => {
		colour_index += backwards ? -1 : 1;
		if (backwards && colour_index < 0) colour_index = colours.length - 1;
		if (!backwards && colour_index >= colours.length) colour_index = 0;
		colour = colours[colour_index];
	};

	const key_up = (e: KeyboardEvent) => {
		switch (e.key) {
			case "Enter":
				toggle_taskbar();
				break;

			case "c":
				toggle_cat();
				break;

			case "k":
				shift_colour();
				break;

			case "j":
				shift_colour(true);
				break;
		}
	};
</script>

<main class="h-screen">
	{#if $media.landscape}
		<button class="text-right cursor-pointer" on:click={toggle_cat} tabindex={-1}>
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
				<p>&nbsp;<b>newty<button class="text-green cursor-pointer inline" on:click={mouse => mouse.button === 0 ? shift_colour() : shift_colour(true)} tabindex={-1} style="color: {colour};">.dev</button></b>      |</p>
				<p>----------------'</p>
			</div>
		</div>

		{#if taskbar_open}
			<div id="socials">
				{#each socials as social, i}
					<p>
						| {i} | <a class="text-green" href={social.url} target={social.external ? "_blank" : "_self"}>
							{social.name}
						</a>
						{" ".repeat(14 - social.name.length)}|
					</p>
				{/each}
				<p>'--------------------'</p>
			</div>
		{/if}
	{:else if $media.landscape === false}
		<button class="cursor-pointer" on:click={toggle_cat} tabindex={-1}>
			<p>&nbsp;/\_/\</p>
			<p>
				{#if cat_open}
					( o.o )
				{:else}
					( -.- )
				{/if}
			</p>
			<p>&nbsp;&gt; ^ &lt;</p>
		</button>

		<p class="font-semibold my-7">
			newty<button
				class="text-green cursor-pointer inline"
				on:click={(mouse) => (mouse.button === 0 ? shift_colour() : shift_colour(true))}
				tabindex={-1}
				style="color: {colour};">.dev</button
			>
		</p>

		{#each socials as social}
			<p class="mb-3">
				<a href={social.url} class="text-green">
					{social.name}
				</a>
			</p>
		{/each}
	{/if}
</main>

<svelte:body on:keyup|preventDefault={key_up} />

<style lang="postcss">
	p {
		@apply xl:text-5xl lg:text-6xl md:text-4xl text-3xl whitespace-pre mt-0 pt-0;
	}
</style>
