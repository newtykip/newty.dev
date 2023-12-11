import update_song from '$lib/utils/updateSong.js';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	let song = await update_song(fetch);
	
	return {
		song
	};
}
