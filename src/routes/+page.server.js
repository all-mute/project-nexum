import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const load = ({ locals }) => {
	const getProjects = async () => {
		try {
			const projects = serializeNonPOJOs(
				await locals.pb.collection('projects').getFullList(undefined)
			);
			return projects;
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
	};

	const getUsers = async () => {
		try {
			const users = serializeNonPOJOs(await locals.pb.collection('users').getFullList(undefined));
			return users;
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
	};


		const getTags = async () => {
		try {
			const tags = serializeNonPOJOs(await locals.pb.collection('tags').getFullList(undefined));
			return tags;
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
	};
	return {
		projects: getProjects(),
		users: getUsers(),
		tags: getTags()
	};
};

