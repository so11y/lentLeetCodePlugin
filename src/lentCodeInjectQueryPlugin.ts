import type { Plugin } from 'lent';
import { createFilter } from '@rollup/pluginutils';
import axios from 'axios';
import MagicString from 'magic-string';
import { writeFileSync } from 'fs';

interface LentInjectQueryOptions {
	host: string;
	port: number;
	include: string;
}

export const injectQueryPlugin = (
	options?: Partial<LentInjectQueryOptions>
): Plugin => {
	let defineOptions: LentInjectQueryOptions;
	let filter;

	return {
		name: 'lent:injectQueryPlugin',
		configureServer(lentInstance) {
			defineOptions = {
				host: 'localhost',
				port: lentInstance.config.port,
				include: './main.ts'
			};
			Object.assign(defineOptions, options || {});
			filter = createFilter(defineOptions.include, null, {
				resolve: lentInstance.config.root
			});
		},
		async transform(code, id) {
			if (filter(id)) {
				const comments = [];
				this.parse(code, {
					onComment: comments
				});
				if (comments.length) {
					const injectComments = comments.filter(
						(v) => v.type === 'Line' && v.value.includes('__lent__inject__')
					);
					const needQuery = injectComments
						.map((v) => {
							const [, query = '', done] = v.value.split(' ').filter(Boolean);
							return {
								...v,
								query,
								done: done === 'done'
							};
						})
						.filter((v) => v.query && !v.done);

					const s = new MagicString(code);
					for (let index = 0; index < needQuery.length; index++) {
						const current = needQuery[index];
						const data = (
							await axios.get(
								`http://${defineOptions.host}:${defineOptions.port}/${current.query}`
							)
						).data;
						s.appendRight(current.end, ' done');
						s.appendRight(current.end + 1, data + '\n');
						writeFileSync(id, s.toString());
					}
				}
			}
		}
	};
};
