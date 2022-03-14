import { LentHttpInstance } from 'lent/dist/types';
import { babelMapToJSCode } from './converTreeNodeCode';
import { babelMapToListNodeCode } from './coverListNodeCode';

interface IRequestType {
	type: string;
	demo: Array<number>; //Record<string, any>;
}

const handleUrl = (s: string) => {
	return s.split('?').slice(1).join('');
};

export const getUrlData = (s: string): IRequestType => {
	const v = new URLSearchParams(handleUrl(s));
	return {
		type: v.get('type'),
		demo: JSON.parse(v.get('demo'))
	};
};

const switchType = (v: IRequestType) => {
	switch (v.type) {
		case 'tree':
			return babelMapToJSCode(v.demo);
		case 'listnode':
			return babelMapToListNodeCode(v.demo);
		default:
			break;
	}
};

export const lentLeetCodePlugin = (i: LentHttpInstance) => {
	i.router.addRouter({
		method: 'get',
		path: '/leetcode',
		handler(req, res) {
			try {
				const v = getUrlData(req.url);
				res.setHeader('Content-Type', 'application/json;charset=utf-8');
				return switchType(v);
			} catch (e) {
				return `{code: 500,msg: ${e}}`;
			}
		}
	});
};
