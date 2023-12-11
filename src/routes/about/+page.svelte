<script lang="ts">
	import { ArrowLeftIcon, ClockIcon, MusicIcon } from "svelte-feather-icons";
	import { title, age, media } from "$lib/stores";
	import { onMount } from "svelte";
	import type { PageData } from "./$types";
	import type { Song } from "$lib/utils/updateSong";
	import { writable } from "svelte/store";
	import update_song from "$lib/utils/updateSong";
	import dayjs from "$lib/dayjs";
	
	export let data: PageData;
	let song = writable<Song | null>();
	let time = writable(dayjs().tz("Europe/London"))

	$title = "newt! - about";

	onMount(() => {
		song.set(data.song);
		setInterval(async () => song.set(await update_song()), 5000);
		setInterval(() => time.set(dayjs().tz("Europe/London")), 1000);
	})
</script>

<main class="h-[90vh]">
	<div class="grid grid-cols-2">
		<p class="text-xl whitespace-pre">
			,-.       _,---._ __  / \
	/  )    .-'       `./ /   \
	(  (   ,'            `/    /|
	\  `-"             \'\   / |
		`.              ,  \ \ /  |
		/`.          ,'-`----Y   |
		(            ;        |   '
		|  ,-.    ,-'         |  /
		|  | (   |            | /
		)  |  \  `.___________|/
		`--'   `--'
		</p>
		{#if $media.landscape}
			<div>
					<p><MusicIcon class="inline" />
						{#if $song}
							<a href={$song.url}>{$song.artist} - {$song.name}</a>
						{:else}
							Not currently listening!
						{/if}
					</p>
					<p><ClockIcon class="inline" /> {$time.format("DD/MM/YY, h:mm a")} UTC{$time.utcOffset() != 0 ? `+${$time.utcOffset() / 60}` : ''}</p>
			</div>
		{/if}
	</div>
	
	<h1 class="text-4xl font-semibold mb-5">about me</h1>
	
	<p>
		The name is newt, I'm a {age} year old mathematician and computer scientist. I have {age - 9} years of experience programming.
	</p>
</main>

<footer class="flex">
	<a href="/">
		<ArrowLeftIcon size="2x" />
	</a>
</footer>

<style lang="postcss">
	p {
		@apply text-2xl;
	}

	a {
		@apply hover:underline;
	}
</style>
