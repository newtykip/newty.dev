import { writable } from "svelte/store";
import watchMedia from "svelte-media";

export let title = writable<string>();
export let description = writable<string>();

export let media = watchMedia({
	landscape: "(orientation: landscape)",
})
