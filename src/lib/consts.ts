interface Link {
	main?: string;
	nav?: string;
	endpoint: string;
}

export const links: Link[] = [
	{
		nav: "Home",
		endpoint: ""
	},
	{
		main: "About Me",
		nav: "About",
		endpoint: "about"
	}
];

export const urls = {
	api: {
		lastfm: "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks"
	},

	steam: "https://steamcommunity.com/id/newtykip"
};
