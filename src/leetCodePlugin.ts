import type { Plugin } from 'lent';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const injectLeetCodeKEY = 'injectLeetCode';
const normalizeInjectKEY = `/${injectLeetCodeKEY}`;

export const injectLeetCodePlugin = (): Plugin => {
	return {
		name: 'lent:injectLeetCode',
		resolveId(id) {
			if (id === injectLeetCodeKEY) {
				return normalizeInjectKEY;
			}
		},
		load(id) {
			if (id === normalizeInjectKEY)
				return readFileSync(resolve(__dirname, './share.js')).toString();
		}
	};
};
