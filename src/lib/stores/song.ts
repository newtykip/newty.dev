import cache from "$lib/cache";
import urls from "$lib/urls";

export interface Song {
	artist: string;
	name: string;
	url: string;
}

export default cache<Song>(
	"song",
	10000,
	async () => {
		const {name, url, artists} = await fetch(`${urls.domain}/api/playing`).then((res) => res.json());

		return {
			artist: artists[0].name,
			name,
			url
		}
	}
)
