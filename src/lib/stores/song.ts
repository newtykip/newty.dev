import cache from "$lib/cache";

export interface Song {
	artist: string;
	name: string;
	url: string;
}

export default cache<Song>("song", 10000, async () => {
	const { name, url, artists } = await fetch(`${window.location.origin}/api/playing`).then((res) =>
		res.json()
	);

	return {
		artist: artists[0].name,
		name,
		url
	};
});
