<script lang="ts">
	import { Clock, Coins, Gamepad2, Music, Star } from "lucide-svelte";
	import { title, age } from "$lib/stores";
	import { onMount } from "svelte";
	import { get, writable } from "svelte/store";
	import dayjs from "$lib/dayjs";
	import game from "$lib/stores/game";
	import starred from "$lib/stores/starred";
	import song, {type Song} from "$lib/stores/song";
	import watchMedia from "svelte-media";
	import donation from "$lib/stores/donation";
	import currency_symbol from 'currency-symbol-map';
	
	let time = writable(dayjs().tz("Europe/London"));
	const media = watchMedia({
		landscape: "(orientation: landscape) and (min-width: 1500px) and (min-height: 700px)"
	});

	$title = "newt! - about";
	let current_song = writable<Song | null>(null);

	onMount(async () => {
		song.subscribe(async song => {
			if (song) {
				current_song.set(await song)
			}
		});

		setInterval(() => {
			if ($media.landscape) {
				time.set(dayjs().tz("Europe/London"))
			}
		}, 1000);
	})
</script>

<main class="{$media.landscape ? "mt-20" : "mt-10"} w-[85vw]">
	<div class="grid grid-cols-2">
		<div>
			<p class="md:text-3xl text-xl whitespace-pre">
|\__/,|   (`\
|_ _  |.--.) )
( T   )     /
(((^_(((/(((_/
			</p>
			<h1 class="md:text-4xl text-4xl font-semibold my-5">about me</h1>
		</div>
		{#if $media.landscape}
			<div class="flex flex-col gap-3 text-2xl text-right">
				<p>
					<Clock class="text-peach" /> {$time.format("DD/MM/YY, h:mm a")} (UTC{$time.utcOffset() != 0 ? `+${$time.utcOffset() / 60}` : ''})
				</p>
				{#await get(game) then game}
					<p>
						<Gamepad2 class="text-blue" /> <a href={game?.url} class="hover" target="_blank">{game?.name}</a>
					</p>
				{/await}
				{#await get(starred) then starred}
					<p>
						<Star class="text-yellow" /> <a href={starred?.url} class="hover" target="_blank">{starred?.repo}</a>
					</p>
				{/await}
				{#if $current_song}
					<p>
						<Music class="text-mauve" /> <a href={$current_song?.url} class="hover" target="_blank">{$current_song?.artist} - {$current_song?.name}</a>
					</p>
				{/if}
				{#await get(donation) then donation}
					<p>
						<Coins class="text-green" /> <a href={`https://ko-fi.com/home/coffeeshop?txid=${donation?.id}`} class="hover" target="_blank">{donation?.name} ({currency_symbol(donation?.currency ?? "")}{donation?.amount})</a>
					</p>
				{/await}
			</div>
		{/if}
	</div>
	
	<p class="content">
		I am newt! I'm a {age} year old mathematician and computer scientist with {age - 9} years of experience programming.
	</p>
	
	<p class="content">
		I'll write the rest of this later (:
	</p>
</main>

<style lang="postcss">
	p.content {
		@apply text-2xl mt-10;
	}
</style>
