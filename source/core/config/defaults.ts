import {BoardConfig} from '../models.js';

const BOARD_DIR = '.board';
const CONFIG_FILE = 'config.yaml';
const BOARD_FILE = 'board.yaml';

const DEFAULT_CONFIG: BoardConfig = {
	provider: 'local',
	theme: 'dark',
	name: 'lazyban',
};

export {BOARD_DIR, CONFIG_FILE, BOARD_FILE, DEFAULT_CONFIG};
