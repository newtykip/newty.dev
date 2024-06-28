import cache from "$lib/cache";

interface Game {
	name: string;
	url: string;
}

export default cache<Game>(
	"game",
	36000,
	async () => await fetch(`${window.location.origin}/api/steam`).then((res) => res.json())
);
