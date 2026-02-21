import fs from 'node:fs';
import path from 'node:path';

import yaml from 'js-yaml';

import {
	BOARD_DIR,
	BOARD_FILE,
	CONFIG_FILE,
} from '../../core/config/defaults.js';
import {KanbanStrategy} from '../../core/KanbanStrategy.js';
import {Board, Column, Card} from '../../core/models.js';

export class LocalStrategy implements KanbanStrategy {
	async getBoards(): Promise<Board[]> {
		throw new Error('getBoards is not implemented for LocalStrategy');
	}

	/* @param id Ignored for LocalStrategy;
	 * always returns the single local board.
	 */
	// @ts-ignore
	async getBoard(id: string): Promise<Board> {
		const cwd = process.cwd();
		const boardPath = path.join(cwd, BOARD_DIR);
		const boardFilePath = path.join(boardPath, BOARD_FILE);
		const configFilePath = path.join(boardPath, CONFIG_FILE);

		if (!fs.existsSync(boardFilePath)) {
			throw new Error('Board file does not exist.');
		}
		if (!fs.existsSync(configFilePath)) {
			throw new Error('Config file does not exist.');
		}

		try {
			// Read and parse config.yaml for board name
			const configContent = fs.readFileSync(configFilePath, 'utf8');
			const config = yaml.load(configContent) as {name: string};

			// Read and parse board.yaml for cards
			const boardContent = fs.readFileSync(boardFilePath, 'utf8');
			const yamlContent = boardContent
				.split('\n')
				.filter(line => !line.trim().startsWith('#'))
				.join('\n');
			const cardsRaw = yaml.load(yamlContent);

			if (!Array.isArray(cardsRaw)) {
				throw new Error('Board file must contain an array of cards.');
			}

			const cards: Card[] = cardsRaw.map(card => ({
				id: card.id,
				title: card.title,
				description: card.description,
				columnId: card.columnId,
				assignee: card.assignee,
				labels: card.labels,
				priority: card.priority,
				feature: card.feature,
				points: card.points,
			}));

			// Hardcoded columns
			const columns: Column[] = [
				{id: 'todo', name: 'TODO', order: 0},
				{id: 'doing', name: 'DOING', order: 1},
				{id: 'blocked', name: 'BLOCKED', order: 2},
				{id: 'done', name: 'DONE', order: 3},
			];

			return {
				id: 'local-board',
				name: config.name,
				columns,
				cards,
			};
		} catch (err) {
			throw new Error('Failed to read board or config file: ' + err);
		}
	}

	async moveCard(cardId: string, columnId: string): Promise<void> {
		throw new Error('moveCard is not implemented for LocalStrategy');
	}

	async updateCard(card: Card): Promise<void> {
		throw new Error('updateCard is not implemented for LocalStrategy');
	}
}
