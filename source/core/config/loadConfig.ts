import fs from 'fs';
import path from 'path';

import {DEFAULT_CONFIG, type BoardConfig} from './defaults.js';

export function loadConfig(): BoardConfig {
	const configPath = path.join(process.cwd(), '.board', 'config.json');

	if (!fs.existsSync(configPath)) {
		return DEFAULT_CONFIG;
	}

	try {
		const raw = fs.readFileSync(configPath, 'utf8');
		const parsed = JSON.parse(raw);

		return {
			...DEFAULT_CONFIG,
			...parsed,
		};
	} catch {
		return DEFAULT_CONFIG;
	}
}
