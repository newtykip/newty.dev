import credentials from "$lib/credentials";
import { json, type RequestHandler } from "@sveltejs/kit";
import { SpotifyAPI } from "@statsfm/spotify.js";
import { urls } from "$lib/consts";

const api = new SpotifyAPI({
	clientCredentials: {
		clientId: credentials.spotify.client_id,
		clientSecret: credentials.spotify.client_secret
	}
});

export const GET: RequestHandler = async () => {
	return await fetch(
		`${urls.api.lastfm}&user=${credentials.lastfm.username}&api_key=${credentials.lastfm.api_key}&format=json`
	)
		.then((res) => res.json())
		.then(async (res) => {
			const lastfm = res.recenttracks.track[0];
			const spotify = await api.search
				.get(`artist:${lastfm.artist["#text"]} ${lastfm.name}`, {
					include: {
						track: true
					},
					limit: 1,
					market: "GB"
				})
				.then((res) => res.tracks.items[0]);

			return json({
				name: spotify.name,
				url: spotify.external_urls.spotify,
				artists: spotify.artists.map((artist) => {
					return {
						name: artist.name,
						url: artist.external_urls.spotify
					};
				}),
				album: {
					name: spotify.album.name,
					url: spotify.album.external_urls.spotify
				}
			});
		});
};
