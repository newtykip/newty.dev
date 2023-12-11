<script lang="ts">
	import { ArrowLeftIcon, ClockIcon, Gamepad2Icon, MusicIcon, StarIcon } from "lucide-svelte";
	import { title, age } from "$lib/stores";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import dayjs from "$lib/dayjs";
	import game from "$lib/stores/game";
	import starred from "$lib/stores/starred";
	import watchMedia from "svelte-media";
	
	let song = writable<Song | null>();
	let time = writable(dayjs().tz("Europe/London"));
	const media = watchMedia({
		landscape: "(orientation: landscape) and (min-width: 1500px) and (min-height: 700px)",
		back_button: "(min-height: 500px)"
	});

	$title = "newt! - about";

	interface Song {
		artist: string;
		name: string;
		url: string;
	}

	const update_song = async (): Promise<Song | null> => {
		const data = await fetch("/api/playing").then((res) => res.json());

		if (data?.name) {
			let { name, url } = data;

			return {
				artist: data.artists[0].name,
				name,
				url
			};
		}

		return null;
	}

	onMount(async () => {
		if ($media.landscape) {
			song.set(await update_song());
		}

		setInterval(async () => {
			if ($media.landscape) {
				song.set(await update_song())
			}
		}, 5000);

		setInterval(() => {
			if ($media.landscape) {
				time.set(dayjs().tz("Europe/London"))
			}
		}, 1000);
	})
</script>

<main class="h-[90vh] pt-10">
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
				<MusicIcon />
				{#if $song}
					<a href={$song.url}>{$song.artist} - {$song.name}</a>
				{:else}
					Not currently listening!
				{/if}
			</p>
			<p>
				<ClockIcon /> {$time.format("DD/MM/YY, h:mm a")} UTC{$time.utcOffset() != 0 ? `+${$time.utcOffset() / 60}` : ''}
			</p>
			{#await game then game}
				<p>
					<Gamepad2Icon /> <a href={game.url} target="_blank">{game.name}</a>
				</p>
			{/await}
			{#await starred then starred}
				<p>
					<StarIcon class="fill-white" /> <a href={starred.url}>{starred.repo}</a>
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
			{#if $media.back_button === false}
				<a class="text-right" href="/">
					<ArrowLeftIcon size="36" />
				</a>
			{/if}
		</div>
	{/if}
	
	<h1 class="md:text-4xl text-4xl font-semibold my-5">about me</h1>
	
	<p class="md:text-2xl text-2xl">
		I am newt! I'm a {age} year old mathematician and computer scientist with {age - 9} years of experience programming. I'll write the rest of this later (:
	</p>
</main>

{#if $media.landscape || $media.back_button}
	<footer>
		<a class="text-right" href="/">
			<ArrowLeftIcon size="36" />
		</a>
	</footer>
{/if}

<style lang="postcss">
	a {
		@apply hover:underline;
	}
</style>
