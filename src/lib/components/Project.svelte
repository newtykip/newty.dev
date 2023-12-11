<script lang="ts">
	import { onMount } from "svelte";

	export let title: string;
	export let description: string | null = null;
	export let link: string | null = null;
	export let repo: string | null = null;

	let width: number, max_length: number, title_padding: number, description_padding: number;

	onMount(() => {
		max_length = Math.max(title.length, description?.length ?? 0, 20);
		title_padding = Math.floor((max_length - title.length) / 2);
		description_padding = description ? Math.floor((max_length - description.length) / 2) + 1 : 0;
		width = max_length + 4;
	});
</script>

<div>
	<p class="whitespace-pre">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|\__/,|   (`\
   _.|o o  |_   ) )
-(((---((({"-".repeat(width - 10)}
	</p>
	
	<span class="whitespace-pre">
		|{" ".repeat(title_padding)}
		{#if link || repo}
			<a href={link ? link : `https://github.com/${repo}`} class="font-bold hover:underline" target="_blank">{title}</a>
		{:else}
			{title}
		{/if}
		{" ".repeat(title_padding + (max_length - title.length) % 2)}|
	</span>
	
	{#if description}
		<p>
			|{"-".repeat(width - 2)}|
		</p>
		
		<p class="whitespace-pre">
			|{" ".repeat(description_padding)}{description}{" ".repeat(description_padding + (max_length - description.length) % 2)}|
		</p>
	{/if}
	
	<p>
		{"-".repeat(width)}
	</p>
</div>
