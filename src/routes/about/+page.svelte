<script lang="ts">
	import { ArrowLeftIcon, ClockIcon, CoinsIcon, Gamepad2Icon, MusicIcon, StarIcon } from "lucide-svelte";
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

{#if !$media.landscape}
	<header class="md:ml-20 md:my-20 ml-8 my-10">
		<a href="/">
			<ArrowLeftIcon size="36" />
		</a>
	</header>
{/if}

<main class="mx-20 {!$media.landscape ? "mb-20" : "mt-40"}">
	{#if $media.landscape}
	<div class="grid grid-cols-2">
		<p class="md:text-3xl text-xl whitespace-pre">
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
		<div class="flex flex-col gap-3 text-2xl text-right">
			<p>
				<ClockIcon /> {$time.format("DD/MM/YY, h:mm a")} (UTC{$time.utcOffset() != 0 ? `+${$time.utcOffset() / 60}` : ''})
			</p>
			{#await get(game) then game}
				<p>
					<Gamepad2Icon /> <a href={game?.url} target="_blank">{game?.name}</a>
				</p>
			{/await}
			{#await get(starred) then starred}
				<p>
					<StarIcon /> <a href={starred?.url}>{starred?.repo}</a>
				</p>
			{/await}
			{#if $current_song}
				<p>
					<MusicIcon /> <a href={$current_song?.url}>{$current_song?.artist} - {$current_song?.name}</a>
				</p>
			{/if}
			{#await get(donation) then donation}
				<p>
					<CoinsIcon /> <a href={`https://ko-fi.com/home/coffeeshop?txid=${donation?.id}`}>{donation?.name} ({currency_symbol(donation?.currency ?? "")}{donation?.amount})</a>
				</p>
			{/await}
		</div>
	</div>
	{:else}
		<div class="grid grid-cols-2">
			<p class="md:text-3xl text-xl whitespace-pre">
|\__/,|   (`\
|_ _  |.--.) )
( T   )     /
(((^_(((/(((_/
			</p>
		</div>
	{/if}
	
	<h1 class="md:text-4xl text-4xl font-semibold my-5">about me</h1>
	
	<p class="md:text-2xl text-2xl">
		I am newt! I'm a {age} year old mathematician and computer scientist with {age - 9} years of experience programming. I'll write the rest of this later (:
	</p>
</main>

{#if $media.landscape}
	<footer class="absolute bottom-16 left-20">
		<a href="/">
			<ArrowLeftIcon size="36" />
		</a>
	</footer>
{/if}

<style lang="postcss">
	a {
		@apply hover:underline;
	}
</style>
