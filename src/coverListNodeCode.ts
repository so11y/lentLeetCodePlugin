import { ListNode } from './share';
const { transformSync } = require('@babel/core');

export const genArrayToListNode = (v: Array<number>) => {
	const walk = () => {
		if (!v.length) return null;
		return new ListNode(v.shift(), walk());
	};
	return walk();
};

const genCode = ({ types }) => {
	return {
		visitor: {
			ObjectExpression(path) {
				let child = path.node.properties.map((v) => v.value);
				const f = child.filter((v) => !types.isNullLiteral(v));
				if (f.length === 1) {
					child = child.slice(0, 1);
				}
				path.replaceWith(
					types.newExpression(types.identifier('ListNode'), child)
				);
			}
		}
	};
};

export const babelMapToListNodeCode = (
	sourceArray: Array<number>,
	index: string
) => {
	let source = '';
	try {
		const node = genArrayToListNode(sourceArray);
		source = JSON.stringify(node);
	} catch {
		throw new Error('convert ListNode Error');
	}
	return transformSync(`const demo${index} = ${source}`, {
		plugins: [genCode]
	}).code;
};
