import { TreeNode } from './share';
const { transformSync } = require('@babel/core');

const genArraytoTreeNode = (v: Array<number>) => {
	const matrixTreeNode = [[v.shift()]];

	while (v.length) {
		const lastLength = matrixTreeNode[matrixTreeNode.length - 1].length;
		matrixTreeNode.push(v.splice(0, lastLength * 2));
	}

	let rightCurrentTreeNode: Array<TreeNode> = matrixTreeNode
		.pop()
		.map((i) => new TreeNode(i));

	while (matrixTreeNode.length) {
		const currentTreeNode = matrixTreeNode.pop();
		const trees = [];
		let breakCount = 0;
		currentTreeNode &&
			currentTreeNode.forEach((v, i) => {
				const node = new TreeNode(v);
				if (v !== null) {
					const renng = i * 2 - breakCount;
					const left = rightCurrentTreeNode[renng];
					const right = rightCurrentTreeNode[renng + 1];
					if (left && left.val !== null) node.left = left;
					if (right && right.val !== null) node.right = right;
				} else {
					breakCount += 2;
				}
				trees.push(node);
			});
		rightCurrentTreeNode = trees;
	}
	return rightCurrentTreeNode[0];
};

const genCode = ({ types }) => {
	return {
		visitor: {
			ObjectExpression(path) {
				path.replaceWith(
					types.newExpression(
						types.identifier('TreeNode'),
						path.node.properties
							.map((v) => v.value)
							.filter((v) => !types.isNullLiteral(v))
					)
				);
			}
		}
	};
};

export const babelMapToJSCode = (sourceArray: Array<number>) => {
	let source = '';
	try {
		const node = genArraytoTreeNode(sourceArray);
		source = JSON.stringify(node);
	} catch {
		throw new Error('conver TreeNode Error');
	}
	return transformSync(`const demo = ${source}`, {
		plugins: [genCode]
	}).code;
};
