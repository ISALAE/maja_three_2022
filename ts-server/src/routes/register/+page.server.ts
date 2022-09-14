import { error } from '@sveltejs/kit';
import { api } from './api';
import type { PageServerLoad, Actions } from './$types';

type Todo = {
	uid: string;
	created_at: Date;
	text: string;
	done: boolean;
	pending_delete: boolean;
};

export const load: PageServerLoad = async ({ locals }) => {
	// locals.userid comes from src/hooks.js
	const response = await api('GET', `todos/${locals.userid}`);

	if (response.status === 404) {
		// user hasn't created a todo list.
		// start with an empty array
		return {
			todos: [] as Todo[]
		};
	}

	if (response.status === 200) {
		return {
			todos: (await response.json()) as Todo[]
		};
	}

	throw error(response.status);
};

export const actions: Actions = {
	register: async ({ request, locals }) => {
		const form = await request.formData();

		await api('POST', `todos/${locals.userid}`, {
			text: form.get('text')
		});
	}
};
