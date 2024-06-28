export default {
	api: {
		lastfm: "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks"
	},

	steam: "https://steamcommunity.com/id/newtykip",
	domain: process.env.NODE_ENV === "development" ? "http://localhost:5173" : "https://newty.dev"
};
