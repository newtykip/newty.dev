import cache from "$lib/cache";

export interface Donation {
	name: string;
	amount: number;
	currency: string;
	id: string;
}

export default cache<Donation>("donation", 36000, async () => {
	const { name, amount, currency, id } = await fetch(`${window.location.origin}/api/donation`).then(
		(res) => res.json()
	);

	return {
		name,
		amount,
		currency,
		id
	};
});
