<script lang="ts">
	import { description, title, media } from "../stores";
	import { ExternalLinkIcon } from "svelte-feather-icons";
	import "../styles/index.css";

	$title = "newt!";
	$description = "17 year old full stack engineer from the UK";

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
			url: "https://github.com/newtykins",
			external: true
		},
		{
			name: "Discord",
			url: "https://discord.gg/ywra9UeJGh",
			external: true
		},
		{
			name: "Steam",
			url: "https://steamcommunity.com/id/newtykins",
			external: true
		},
		{
			name: "Twitch",
			url: "https://twitch.tv/newtykip",
			external: true
		}
	]

	const colours = [
		'inherit',
		'#f38ba8', // RED
		'#eba0ac', // ORANGE
		'#f9e2af', // YELLOW
		'#a6e3a1', // GREEN
		'#74c7ec', // CYAN
		'#89b4fa', // BLUE
		'#cba6f7', // PURPLE
		'#f5c2e7', // PINK
	]

	let colour_index = 0;
	$: cat_open = false;
	$: taskbar_open = false;
	$: colour = colours[0];

	const toggle_cat = () => cat_open = !cat_open;
	const toggle_taskbar = () => taskbar_open = !taskbar_open;

	const shift_colour = (backwards: boolean = false) => {
		colour_index += backwards ? -1 : 1;
		if (backwards && colour_index < 0) colour_index = colours.length - 1;
		if (!backwards && colour_index >= colours.length) colour_index = 0;
		colour = colours[colour_index];
	}

	const key_up = (e: KeyboardEvent) => {
		switch (e.key) {
			case 'Enter':
				toggle_taskbar();
				break;

			case 'c':
				toggle_cat();
				break;

			case 'k':
				shift_colour();
				break;
			
			case 'j':
				shift_colour(true);
				break;
		}
	};
</script>

<main>
	{#if $media.landscape }
		<button id="cat" on:click={toggle_cat} tabindex={-1}>
			<p>.----------------.</p>
			<p>| |\__/,|   (`\  |</p>
			<p>| |_ _  |.--.) ) |</p>
			{#if cat_open}
				<p>| ( T   )     )  |</p>
			{/if}
		</button>
		
		<div id="taskbar">
			<button on:click={toggle_taskbar} tabindex={-1}>
				<p>.----</p>
				<p>| {#if taskbar_open}-{:else}+{/if} |</p>
				<p>'----</p>
			</button>
			<div>
				<p>----------------.</p>
				<p>&nbsp;<b>newty<button on:click={mouse => mouse.button === 0 ? shift_colour() : shift_colour(true)} tabindex={-1} class="inline" style="color: {colour};">.dev</button></b>      |</p>
				<p>----------------'</p>
			</div>
		</div>
		
		{#if taskbar_open}
			<div id="socials">
				{#each socials as social, i}
					<p>
						| {i} | <a href={social.url} target={social.external ? "_blank" : "_self"}>
							{social.name}
							{#if social.external}
								<ExternalLinkIcon class="inline absolute mt-1" />
							{/if}
						</a>
						{" ".repeat(13 - social.name.length)}|
					</p>
				{/each}
				<p>'--------------------'</p>
			</div>
		{/if}
	{:else}
		<p class="">
			{` /\\_/\\  
( o.o ) 
 > ^ <`}
		</p>

		<p class="font-semibold my-5">newty.dev</p>

		{#each socials as social}
				<p class="mb-1">
					<a href={social.url}>
						{social.name}
						{#if social.external}
							<ExternalLinkIcon class="inline absolute mt-1" />
						{/if}
					</a>
				</p>
		{/each}
	{/if}
</main>


<svelte:body on:keyup|preventDefault={key_up} />
