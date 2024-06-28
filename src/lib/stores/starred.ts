import cache from "$lib/cache";

interface Starred {
	repo: string;
	url: string;
}

export default cache<Starred>(
	"starred",
	36000,
	async () =>
		await fetch(`https://api.github.com/users/newtykip/starred`)
			.then((res) => res.json())
			.then((res) => {
				const [recent] = res;

				return {
					repo: recent?.["full_name"],
					url: `https://github.com/${recent?.["full_name"]}`
				};
			})
);
