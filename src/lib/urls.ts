export default {
	api: {
		lastfm: "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks"
	},

	steam: "https://steamcommunity.com/id/newtykins",
	discord: "https://discord.gg/ywra9UeJGh",
	youtube: "https://www.youtube.com/channel/UCZ_qnC2IB3dbyNj7ueq_mcA",
	github: "https://github.com/newtykins",
	codeberg: "https://codeberg.org/newt",
	twitch: "https://twitch.tv/newtykip",
	domain: process.env.NODE_ENV === "development" ? "http://localhost:5173" : "https://newty.dev"
};
