import {KanbanStrategy} from './KanbanStrategy.js';
import {Card, Board} from './models.js';

export class KanbanService {
	constructor(private strategy: KanbanStrategy) {}

	setStrategy(strategy: KanbanStrategy) {
		this.strategy = strategy;
	}

	async getBoards(): Promise<Board[]> {
		return this.strategy.getBoards();
	}

	async getBoard(name: string): Promise<Board> {
		return this.strategy.getBoard(name);
	}

	async moveCard(cardId: string, columnId: string): Promise<void> {
		await this.strategy.moveCard(cardId, columnId);
	}

	async updateCard(card: Card): Promise<void> {
		await this.strategy.updateCard(card);
	}
}
