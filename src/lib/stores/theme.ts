import { browser } from "$app/environment";
import { get, writable, type Updater } from "svelte/store";

const { subscribe, set } = writable(browser ? localStorage.getItem("theme") ?? "mocha" : "mocha");

const theme = {
	subscribe,
	set: (theme: string) => {
		set(theme);
		localStorage.setItem("theme", theme);
	}
};

export default theme;
