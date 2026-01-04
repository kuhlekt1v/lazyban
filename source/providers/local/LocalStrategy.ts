import {KanbanStrategy} from '../../core/KanbanStrategy.js';
import {Board, Card} from '../../core/models.js';

export class LocalStrategy implements KanbanStrategy {
	private boards: Board[] = [
		{
			id: 'board-1',
			name: 'Sample Board',
			columns: [
				{id: 'todo', name: 'TODO', cardIds: ['1', '2'], order: 0},
				{id: 'doing', name: 'DOING', cardIds: [], order: 1},
				{id: 'blocked', name: 'BLOCKED', cardIds: [], order: 2},
				{id: 'done', name: 'DONE', cardIds: [], order: 3},
			],
			cards: [
				{
					id: '1',
					title: 'Write Ink CLI 1',
					feature: '',
					description: '',

					boardId: 'board-1',
					columnId: 'todo',
					priority: 'low',
				},
				{
					id: '2',
					title: 'Test Providers 2',

					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'medium',
					feature: '',
					points: 5,
				},
				{
					id: '3',
					title: 'Test Providers 3',

					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'medium',
					feature: 'Testing',
					points: 5,
				},
				{
					id: '4',
					title: 'Test Providers 4',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'high',
					feature: 'Testing',
					points: 5,
				},
				{
					id: '5',
					title: 'Test Providers 5',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'high',
					feature: 'Testing',
					points: 5,
				},
				{
					id: '6',
					title: 'Test Providers 6',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'high',
					feature: 'Testing',
					points: 5,
				},
				{
					id: '7',
					title: 'Test Providers 7',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'high',
					feature: 'Testing',
					points: 5,
				},
			],
		},
		// {
		// 	id: 'board-2',
		// 	name: 'Sample Board',
		// 	columns: [
		// 		{id: 'todo', name: 'TODO', cardIds: ['1', '2'], order: 0},
		// 		{id: 'doing', name: 'DOING', cardIds: [], order: 1},
		// 		{id: 'blocked', name: 'BLOCKED', cardIds: [], order: 2},
		// 		{id: 'done', name: 'DONE', cardIds: [], order: 3},
		// 	],
		// 	cards: [
		// 		{id: '1', title: 'Write Ink CLI', boardId: 'board-1', columnId: 'todo'},
		// 		{
		// 			id: '2',
		// 			title: 'Test Providers',
		// 			boardId: 'board-1',
		// 			columnId: 'todo',
		// 		},
		// 	],
		// },
	];

	async getBoards(): Promise<Board[]> {
		return this.boards;
	}

	async getBoard(id: string): Promise<Board> {
		const board = this.boards.find(b => b.id === id);
		if (!board) throw new Error('Board not found');
		return board;
	}

	async moveCard(cardId: string, columnId: string): Promise<void> {
		const board = this.boards[0];
		const card = board.cards.find(c => c.id === cardId);
		if (!card) return;

		// Remove from old column
		board.columns.forEach(col => {
			col.cardIds = col.cardIds.filter(id => id !== cardId);
		});

		// Add to new column
		const targetCol = board.columns.find(c => c.id === columnId);
		if (targetCol) targetCol.cardIds.push(cardId);

		card.columnId = columnId;
	}

	async updateCard(card: Card): Promise<void> {
		const board = this.boards[0];
		const idx = board.cards.findIndex(c => c.id === card.id);
		if (idx >= 0) board.cards[idx] = card;
	}
}
