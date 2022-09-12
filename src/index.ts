import { ServerResponse } from 'http';
import { MiddlewarePlugin } from 'lent';
import { parse } from 'url';
import { babelMapToJSCode } from './converTreeNodeCode';
import { babelMapToListNodeCode } from './coverListNodeCode';
export * from './leetCodePlugin';
export * from './share';
interface IRequestType {
	type: string;
	demo: Array<number>;
}

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
const sendError = (res: ServerResponse, error: string) => {
	res.statusCode = 500;
	res.end(error);
};

export const lentLeetCode: MiddlewarePlugin = () => {
	return (req, res, next) => {
		if (req.url.startsWith('/leetcode')) {
			const { query } = parse(req.url);
			const params = new URLSearchParams(query);
			if (!params.get('type') || !params.get('demo')) {
				return sendError(res, 'type or demo null');
			}
			try {
				const source = switchType({
					type: params.get('type'),
					demo: JSON.parse(params.get('demo'))
				});
				res.end(source);
			} catch (error) {
				sendError(res, error.message);
			}
			return;
		}
		next();
	};
};

// export { genArraytoTreeNode, genArraytoListNode };
