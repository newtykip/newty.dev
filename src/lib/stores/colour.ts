import { browser } from "$app/environment";
import { get, writable, type Updater } from "svelte/store";

const colours = [
	"inherit",
	"text-red",
	"text-peach",
	"text-yellow",
	"text-green",
	"text-teal",
	"text-blue",
	"text-mauve",
	"text-pink"
];

const { subscribe, set } = writable(
	browser ? localStorage.getItem("colour") ?? colours[0] : colours[0]
);

const update = (updater: Updater<string>) => {
	// update subscribers
	let value = updater(get(colour));
	set(value);

	// update localStorage
	localStorage.setItem("colour", value);
};

const colour = {
	subscribe,
	next: () =>
		update((colour) => {
			const index = colours.indexOf(colour);
			return colours[(index + 1) % colours.length];
		}),
	back: () =>
		update((colour) => {
			const index = colours.indexOf(colour);
			return colours[(index + colours.length - 1) % colours.length];
		})
};

export default colour;
