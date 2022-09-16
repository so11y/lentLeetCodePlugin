import { MiddlewarePlugin } from 'lent';
import { ServerResponse } from 'http';
import { handleCode } from './handleCode';

export * from './leetCodePlugin';
export * from './lentCodeInjectQueryPlugin';
export * from './share';

const sendError = (res: ServerResponse, error: string) => {
	res.statusCode = 500;
	res.end(error);
};

export const lentLeetCode: MiddlewarePlugin = () => {
	return (req, res, next) => {
		if (req.url.startsWith('/leetcode')) {
			try {
				res.end(handleCode(req.url));
			} catch (error) {
				sendError(res, error.message);
			}
			return;
		}
		next();
	};
};
