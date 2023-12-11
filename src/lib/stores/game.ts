import cache from "$lib/cache";
import urls from "$lib/urls";

interface Game {
	name: string;
	url: string;
}

export default cache<Game>(
	"game",
	36000,
	async () => await fetch(`${urls.domain}/api/steam`).then((res) => res.json())
);
