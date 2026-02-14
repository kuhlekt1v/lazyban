import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const BOARD_DIR = '.board';
const CONFIG_FILE = 'config.yaml';
const BOARD_FILE = 'board.yaml';

export interface BoardConfig {
	provider: string;
	theme: string;
}

/**
 * Check if the .board directory exists in the current working directory
 */
export function checkBoardDirectory(): boolean {
	const boardPath = path.join(process.cwd(), BOARD_DIR);
	return fs.existsSync(boardPath);
}

/**
 * Create the .board directory in the current working directory
 */
export function createBoardDirectory(): void {
	const boardPath = path.join(process.cwd(), BOARD_DIR);
	if (!fs.existsSync(boardPath)) {
		fs.mkdirSync(boardPath, {recursive: true});
	}
}

/**
 * Create the config.yaml file with the provided configuration
 */
export function createConfigFile(config: BoardConfig): void {
	const boardPath = path.join(process.cwd(), BOARD_DIR);
	const configPath = path.join(boardPath, CONFIG_FILE);
	const yamlContent = yaml.dump(config);
	fs.writeFileSync(configPath, yamlContent, 'utf8');
}

/**
 * Create an empty board.yaml file
 */
export function createBoardFile(): void {
	const boardPath = path.join(process.cwd(), BOARD_DIR);
	const boardFilePath = path.join(boardPath, BOARD_FILE);
	// Create an empty file or with minimal structure
	fs.writeFileSync(boardFilePath, '', 'utf8');
}

/**
 * Read the configuration from config.yaml
 */
export function readConfigFile(): BoardConfig | null {
	const boardPath = path.join(process.cwd(), BOARD_DIR);
	const configPath = path.join(boardPath, CONFIG_FILE);

	if (!fs.existsSync(configPath)) {
		return null;
	}

	try {
		const fileContent = fs.readFileSync(configPath, 'utf8');
		const config = yaml.load(fileContent) as BoardConfig;
		return config;
	} catch {
		return null;
	}
}
