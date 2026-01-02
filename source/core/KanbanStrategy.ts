import {Board, Card} from './models.js';

export interface KanbanStrategy {
	getBoards(): Promise<Board[]>;
	getBoard(id: string): Promise<Board>;
	moveCard(cardId: string, columnId: string): Promise<void>;
	updateCard(card: Card): Promise<void>;
}
