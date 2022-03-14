import { ListNode } from './share';
const { transformSync } = require('@babel/core');

export const genArraytoListNode = (v: Array<number>) => {
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
				let childs = path.node.properties.map((v) => v.value);
				const f = childs.filter((v) => !types.isNullLiteral(v));
				if (f.length === 1) {
					childs = childs.slice(0, 1);
				}
				path.replaceWith(
					types.newExpression(types.identifier('ListNode'), childs)
				);
			}
		}
	};
};

export const babelMapToListNodeCode = (sourceArray: Array<number>) => {
	let source = '';
	try {
		const node = genArraytoListNode(sourceArray);
		source = JSON.stringify(node);
	} catch {
		throw new Error('conver ListNode Error');
	}
	return transformSync(`const demo = ${source}`, {
		plugins: [genCode]
	}).code;
};
