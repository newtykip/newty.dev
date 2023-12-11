export interface Song {
	artist: string;
	name: string;
	url: string;
}

export default async function update_song(get = fetch): Promise<Song | null> {
	const data = await get("/api/spotify").then(res => res.json());

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
