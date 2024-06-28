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
