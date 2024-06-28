import { env } from "$env/dynamic/private";

const spotify = {
	client_id: env.SPOTIFY_CLIENT_ID,
	client_secret: env.SPOTIFY_CLIENT_SECRET
};

const lastfm = {
	username: "newtykip",
	api_key: env.LASTFM_API
};

const kofi = {
	verification: env.KOFI_VERIFICATION
};

const vercel = {
	config_id: env.EDGE_CONFIG_ID,
	api_key: env.VERCEL_API
};

export { lastfm, spotify, kofi, vercel };

export default {
	lastfm,
	spotify,
	kofi,
	vercel
};
