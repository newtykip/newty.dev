import { browser } from "$app/environment";

const cache = async <T>(key: string, ttl: number, getter: () => Promise<T>): Promise<T> => {
	let data = browser ? JSON.parse(localStorage.getItem(key) as string) ?? null : null;
	let timestamp = new Date().getTime();

	if (!data || timestamp > data?.expires) {
		data = await getter();

		if (browser)
			localStorage.setItem(
				key,
				JSON.stringify({
					...data,
					expires: timestamp + ttl
				})
			);
	} else if (data?.expires) {
		delete data.expires;
	}

	return data;
};

export default cache;
