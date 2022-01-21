import { LentHttpInstance } from 'lent/dist/types';

export const lentLeetCodePlugin = (i: LentHttpInstance) => {
	i.router.addRouter({
		method: 'post',
		path: '/LeetCode',
		handler() {
			return '1010';
		}
	});
};
