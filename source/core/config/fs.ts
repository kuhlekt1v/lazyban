import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import {BoardConfig} from '../models.js';
import {DEFAULT_CONFIG} from './defaults.js';

const BOARD_DIR = '.board';
const CONFIG_FILE = 'config.yaml';
const BOARD_FILE = 'board.yaml';

/*
 * Check if the .board directory exists in the
 * current working directory.
 */
export function checkBoardDirectory(): boolean {
	const boardPath = path.join(process.cwd(), BOARD_DIR);
	return fs.existsSync(boardPath);
}

/*
 * Create the .board directory in the current
 * working directory.
 */
export function createBoardDirectory(): void {
	const boardPath = path.join(process.cwd(), BOARD_DIR);
	if (!fs.existsSync(boardPath)) {
		fs.mkdirSync(boardPath, {recursive: true});
	}
}

// Create the config.yaml file with the provided configuration
export function createConfigFile(config: BoardConfig): void {
	const boardPath = path.join(process.cwd(), BOARD_DIR);
	const configPath = path.join(boardPath, CONFIG_FILE);
	const yamlContent = yaml.dump(config);
	fs.writeFileSync(configPath, yamlContent, 'utf8');
}

// Create an empty board.yaml file with the board name.
export function createBoardFile(boardName: string): void {
	const boardPath = path.join(process.cwd(), BOARD_DIR);
	const boardFilePath = path.join(boardPath, BOARD_FILE);

	const sampleCard = {
		id: 'sample-1',
		title: 'Welcome! Explore your first card',
		description:
			'This is a sample card to help you get started. You can edit the title, description, priority, and move this card between columns.',
		columnId: 'todo',
		priority: 'medium',
		feature: 'Onboarding',
		points: 1,
	};

	const boardData = {
		name: boardName,
		columns: [],
		cards: [sampleCard],
	};

	const comments = `
  ########## Card Structure ##########
  #
	#id: "string"            # required
	#title: "string"         # required
	#columnId: "string"      # required
	#description: "string"   # optional
	#assignee: "string"      # optional
	#labels: []              # optional (array of strings)
	#priority: "low"         # optional (low | medium | high)
	#feature: "string"       # optional
	#points: 0               # optional (number)
	#
  ###################################

`;

	const yamlContent = yaml.dump(boardData.cards[0]);
	fs.writeFileSync(boardFilePath, comments + yamlContent, 'utf8');
}

// Read the configuration from config.yaml
export function readConfigFile(): BoardConfig {
	const boardPath = path.join(process.cwd(), BOARD_DIR);
	const configPath = path.join(boardPath, CONFIG_FILE);

	if (!fs.existsSync(configPath)) {
		// Return default config if config file does not exist
		return DEFAULT_CONFIG;
	}

	try {
		const fileContent = fs.readFileSync(configPath, 'utf8');
		const config = yaml.load(fileContent);

		// Validate config structure
		if (
			typeof config === 'object' &&
			config !== null &&
			'provider' in config &&
			'theme' in config
		) {
			return config as BoardConfig;
		}

		// Return default config if structure is invalid
		return DEFAULT_CONFIG;
	} catch {
		// Return default config on error
		return DEFAULT_CONFIG;
	}
}
