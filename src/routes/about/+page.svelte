<script lang="ts">
	import { ArrowLeftIcon, ClockIcon, Gamepad2Icon, MusicIcon, StarIcon } from "lucide-svelte";
	import { title, age, media } from "$lib/stores";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import dayjs from "$lib/dayjs";
	import game from "$lib/stores/game";
	import starred from "$lib/stores/starred";
	
	let song = writable<Song | null>();
	let time = writable(dayjs().tz("Europe/London"));

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

<main class="h-[90vh]">
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
		<p class="md:text-3xl text-xl whitespace-pre">
|\__/,|   (`\
|_ _  |.--.) )
( T   )     /
(((^_(((/(((_/
		</p>
	{/if}
	
	<h1 class="lg:text-4xl md:text-6xl text-4xl font-semibold my-5">about me</h1>
	
	<p class="lg:text-2xl md:text-4xl text-2xl">
		I am newt! I'm a {age} year old mathematician and computer scientist with {age - 9} years of experience programming.
	</p>
</main>

<footer>
	<a href="/">
		<ArrowLeftIcon size="36" />
	</a>
</footer>

<style lang="postcss">
	a {
		@apply hover:underline;
	}
</style>
