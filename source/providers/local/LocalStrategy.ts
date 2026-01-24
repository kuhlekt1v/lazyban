import {KanbanStrategy} from '../../core/KanbanStrategy.js';
import {Board, Card} from '../../core/models.js';

export class LocalStrategy implements KanbanStrategy {
	private boards: Board[] = [
		{
			id: 'board-1',
			name: 'BoardCTL MVP',
			columns: [
				{id: 'todo', name: 'TODO', order: 0},
				{id: 'doing', name: 'DOING', order: 1},
				{id: 'blocked', name: 'BLOCKED', order: 2},
				{id: 'done', name: 'DONE', order: 3},
			],
			cards: [
				// Card Details Feature
				{
					id: '1',
					title: 'Design card detail view UI',
					description:
						'Layout for expanded card view with description, due date, comments, and close action',
					boardId: 'board-1',
					columnId: 'doing',
					priority: 'high',
					feature: 'Card Details',
					points: 3,
				},
				{
					id: '2',
					title: 'Implement card detail modal on <enter>',
					description:
						'Create detail view component with proper focus management and keyboard navigation',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'high',
					feature: 'Card Details',
					points: 5,
				},
				{
					id: '3',
					title: 'Add comments section to card details',
					description:
						'Display and scroll through card comments in detail view',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'medium',
					feature: 'Card Details',
					points: 3,
				},

				// Keybind Help Menu
				{
					id: '4',
					title: 'Design help menu UI',
					description: 'Layout all keybindings in organized, scannable format',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'medium',
					feature: 'Keybind Help Menu',
					points: 2,
				},
				{
					id: '5',
					title: 'Implement <?> keybind help modal',
					description:
						'Create modal that displays on <?> press with all current keybindings',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'medium',
					feature: 'Keybind Help Menu',
					points: 3,
				},

				// Enhanced Column Navigation
				{
					id: '6',
					title: 'Implement gg (first card) keybind',
					description: 'Jump to first card in focused column',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'medium',
					feature: 'Enhanced Navigation',
					points: 2,
				},
				{
					id: '7',
					title: 'Implement Shift+G (last card) keybind',
					description: 'Jump to last card in focused column',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'medium',
					feature: 'Enhanced Navigation',
					points: 2,
				},
				{
					id: '8',
					title: 'Implement PgDn/PgUp group navigation',
					description: 'Navigate through card groups with page up/down keys',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'low',
					feature: 'Enhanced Navigation',
					points: 3,
				},

				// Card Sorting
				{
					id: '9',
					title: 'Implement default weighted sort algorithm',
					description:
						'Sort by nearest due date + highest priority to furthest + lowest',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'high',
					feature: 'Card Sorting',
					points: 5,
				},
				{
					id: '10',
					title: 'Design sort & filter side panel UI',
					description: 'Panel with sort/filter options that opens on keypress',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'medium',
					feature: 'Card Sorting',
					points: 3,
				},
				{
					id: '11',
					title: 'Implement sort & filter side panel',
					description:
						'Interactive panel for selecting sort and filter criteria',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'medium',
					feature: 'Card Sorting',
					points: 5,
				},
				{
					id: '12',
					title: 'Add active filter/sort indicator to board header',
					description:
						'Display current sort and filter settings at top of board',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'low',
					feature: 'Card Sorting',
					points: 2,
				},

				// Content Strategies - Local
				{
					id: '13',
					title: 'Define local config file schema',
					description: 'JSON/YAML schema for local board configuration in CWD',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'high',
					feature: 'Content Strategy - Local',
					points: 3,
				},
				{
					id: '14',
					title: 'Implement local config file reader',
					description:
						'Load and parse local config from current working directory',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'high',
					feature: 'Content Strategy - Local',
					points: 5,
				},
				{
					id: '15',
					title: 'Implement card move functionality (MVP)',
					description: 'Allow moving cards between columns with keybinds',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'high',
					feature: 'Content Strategy - Local',
					points: 8,
				},
				{
					id: '16',
					title: 'Implement add card functionality (post-MVP)',
					description: 'Create new cards via modal/prompt',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'low',
					feature: 'Content Strategy - Local',
					points: 5,
				},
				{
					id: '17',
					title: 'Implement delete card functionality (post-MVP)',
					description: 'Delete cards with confirmation prompt',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'low',
					feature: 'Content Strategy - Local',
					points: 3,
				},

				// Content Strategies - Jira
				{
					id: '18',
					title: 'Design Jira initialization flow',
					description:
						'Prompts for auth details and column mapping configuration',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'medium',
					feature: 'Content Strategy - Jira',
					points: 3,
				},
				{
					id: '19',
					title: 'Implement Jira auth configuration',
					description: 'Collect and store Jira API credentials securely',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'medium',
					feature: 'Content Strategy - Jira',
					points: 5,
				},
				{
					id: '20',
					title: 'Implement Jira column mapping',
					description:
						'Map Jira columns to boardctl columns (todo, doing, blocked, done)',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'medium',
					feature: 'Content Strategy - Jira',
					points: 5,
				},
				{
					id: '21',
					title: 'Save Jira config to CWD',
					description:
						'Write Jira configuration file to current working directory',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'medium',
					feature: 'Content Strategy - Jira',
					points: 3,
				},
				{
					id: '22',
					title: 'Implement Jira API integration',
					description: 'Fetch and sync cards from Jira API',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'medium',
					feature: 'Content Strategy - Jira',
					points: 8,
				},

				// Identity
				{
					id: '23',
					title: 'Implement user identity configuration',
					description: 'Allow user to set their identity for card ownership',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'medium',
					feature: 'Identity',
					points: 3,
				},
				{
					id: '24',
					title: 'Add ownership visual indicators',
					description:
						'Display card ownership (me, other, unassigned) with visual cues',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'medium',
					feature: 'Identity',
					points: 3,
				},
				{
					id: '25',
					title: 'Implement ownership filtering',
					description: 'Filter cards by ownership category in sort panel',
					boardId: 'board-1',
					columnId: 'todo',
					priority: 'low',
					feature: 'Identity',
					points: 2,
				},
			],
		},
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
