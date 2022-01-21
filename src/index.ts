import { LentHttpInstance } from 'lent/dist/types';
import { babelMapToJSCode } from './converTreeNodeCode';
import path from 'path';
import fs from 'fs/promises';

const handleUrl = (s: string) => {
	return s.split('?').slice(1).join('');
};

const getUrlData = (s: string) => {
	const v = new URLSearchParams(handleUrl(s));
	return {
		type: v.get('type'),
		demo: JSON.parse(v.get('demo'))
	};
};

export const lentLeetCodePlugin = (
	i: LentHttpInstance,
	fileName = 'index.ts'
) => {
	i.router.addRouter({
		method: 'get',
		path: '/leetcode',
		handler(req, res) {
			const v = getUrlData(req.url);
			const p = path.join(process.cwd(), i.config.root, fileName);
			res.setHeader('Content-Type', 'application/json;charset=utf-8');
			switch (v.type) {
				case 'tree':
					fs.readFile(p).then((f) => {
						fs.writeFile(
							p,
							`${babelMapToJSCode(v.demo)}
                             ${f}
                                `
						);
					});
					return `{code:200}`;
				default:
					break;
			}
			return '';
		}
	});
};
