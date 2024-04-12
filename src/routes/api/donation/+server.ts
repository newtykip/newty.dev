import { env } from "$env/dynamic/private";
import { kofi, vercel } from "$lib/credentials";
import type { Donation } from "$lib/stores/donation";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
	const data = await fetch(env.EDGE_CONFIG).then(res => res.json()).then(res => res.items);

	return json(data);
};

export const POST: RequestHandler = async ({ request }) => {
	let success = false;

	try {
		// accept the data
		const form_data = (await request.formData()).get("data");

		if (form_data) {
			const data = JSON.parse(form_data.toString());

			// ensure the verification token matches
			if (data.verification_token === kofi.verification) {
				// store the donation
				await fetch(`https://api.vercel.com/v1/edge-config/${vercel.config_id}/items`, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${vercel.api_key}`,
					}, 
					body: JSON.stringify({
						items: [
							{
								operation: "update",
								key: "name",
								value: data.from_name
							},
							{
								operation: "update",
								key: "amount",
								value: data.amount
							},
							{
								operation: "update",
								key: "currency",
								value: data.currency
							},
							{
								operation: "update",
								key: "id",
								value: data.kofi_transaction_id
							}
						]
					})
				}).then(res => res.json());
			}
		}

		success = true;
	} catch {}

	return json({
		success
	});
};
