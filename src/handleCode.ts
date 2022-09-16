import { parse } from 'url';
import { babelMapToJSCode } from './converTreeNodeCode';
import { babelMapToListNodeCode } from './coverListNodeCode';

interface IRequestType {
	type: string;
	demo: Array<number>;
	index: string;
}

export const switchType = (v: IRequestType) => {
	switch (v.type) {
		case 'tree':
			return babelMapToJSCode(v.demo, v.index);
		case 'listnode':
			return babelMapToListNodeCode(v.demo, v.index);
	}
};

export const handleCode = (url: string) => {
	const { query } = parse(url);
	const params = new URLSearchParams(query);
	if (!params.get('type') || !params.get('demo')) {
		return new Error('type or demo null');
	}
	const source = switchType({
		type: params.get('type'),
		demo: JSON.parse(params.get('demo')),
		index: params.get('index') || ''
	});
	return source;
};
