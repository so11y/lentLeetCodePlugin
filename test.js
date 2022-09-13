const { parse } = require('@babel/core');

const v = parse(
	`
// ___a___ 10;
const b: string ='1';
`,
	{
		presets: [['babel-preset-typescript']]
	}
);

console.log(v);

// const ts = require('typescript');

// // const filename = './gogo.ts';
// // const program = ts.createProgram([filename], {}); // 第二个参数是 compiler options，就是配置文件里的那些

// // const sourceFile = program.getSourceFile(filename);

// // const typeChecker = program.getTypeChecker();

// const result = ts.transpileModule(
// 	`
// // ___a___ 10;
// const b: string ='1';

// `,
// 	{
// 		transformers: {
// 			before: [
// 				function (context) {
// 					return {
// 						transformSourceFile(rootNode) {
// 							// ts.visitNode(node, visit);
// 							// return ts.visitEachChild(node.statements, visit, context);
// 							return ts.visitNode(rootNode, visit, context);
// 							function visit(parent) {
// 								const visitEachChild = (node) => {
// 									if (ts.isCommaListExpression(node)) {
// 										console.log('---', node);
// 									}

// 									// if (ts.isVariableStatement(node)) {
// 									// 	console.log('---', node);
// 									// }
// 									if (node) return node;
// 								};
// 								return ts.visitEachChild(parent, visitEachChild, context);
// 							}
// 						}
// 					};
// 				}
// 			]
// 		}
// 	}
// );
// console.log(result);
// // const { transformed } = ts.transform(
// // 	`
// // // ___a___ 10;
// // const b: string ='1';

// // `,
// // 	[
// // 		function (context) {
// // 			return function (node) {
// // 				return ts.visitNode(node, visit);
// // 				function visit(node) {
// // 					console.log(node);
// // 					// if (ts.isTypeReferenceNode(node)) {
// // 					// 	const type = typeChecker.getTypeFromTypeNode(node);
// // 					// 	if (type.value) {
// // 					// 		ts.addSyntheticTrailingComment(
// // 					// 			node,
// // 					// 			ts.SyntaxKind.SingleLineCommentTrivia,
// // 					// 			type.value
// // 					// 		);
// // 					// 	}
// // 					// }
// // 					// return ts.visitEachChild(node, visit, context);
// // 				}
// // 			};
// // 		}
// // 	]
// // );
