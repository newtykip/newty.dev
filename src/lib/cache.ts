import { browser } from "$app/environment";
import { readable } from "svelte/store";

const get_data = async <T>(key: string, ttl: number, getter: () => Promise<T>): Promise<T> => {
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

const cache = <T>(key: string, ttl: number, getter: () => Promise<T>) => readable<Promise<T> | null>(null, set => {
	set(get_data(key, ttl, getter));

	const interval = setInterval(() => {
		set(get_data(key, ttl, getter));
	}, ttl);

	return () => clearInterval(interval);
})

export default cache;
