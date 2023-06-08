import { serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';

export const load = ({ locals, params }) => {
	const getProject = async (projectId) => {
		try {
			const project = serializeNonPOJOs(await locals.pb.collection('projects').getOne(projectId));
			return project;
		} catch (err) {
			console.log('Error: ', err);
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
	return {
		project: getProject(params.projectId),
		users: getUsers()
	};
};
