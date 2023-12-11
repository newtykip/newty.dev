import { env } from "$env/dynamic/private";

const spotify = {
	client_id: env.SPOTIFY_CLIENT_ID,
	client_secret: env.SPOTIFY_CLIENT_SECRET,
}

const lastfm = {
	username: "newtykip",
	api_key: env.LASTFM_API
};

export { lastfm, spotify };

export default {
	lastfm,
	spotify
};
