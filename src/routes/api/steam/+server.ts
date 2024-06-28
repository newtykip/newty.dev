import { urls } from "$lib/consts";
import { json, type RequestHandler } from "@sveltejs/kit";
import { load } from "cheerio";

export const GET: RequestHandler = async () => {
	return await fetch(urls.steam)
		.then((res) => res.text())
		.then((res) => {
			let $ = load(res);

			let mostRecentGame = $("div.recent_games")
				.find("div.recent_game")
				.first()
				.find("div.game_info")
				.first()
				.find("div.game_name");

			return json({
				name: mostRecentGame.text(),
				url: mostRecentGame.children().first().attr("href")
			});
		});
};
