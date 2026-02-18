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
					columnId: 'done',
					priority: 'high',
					feature: 'Card Details',
					points: 3,
				},
				{
					id: '2',
					title: 'Implement card detail modal on <enter>',
					description:
						'Create detail view component with proper focus management and keyboard navigation',
					columnId: 'doing',
					priority: 'high',
					feature: 'Card Details',
					points: 5,
				},
				{
					id: '3',
					title: 'Add comments section to card details',
					description:
						'Display and scroll through card comments in detail view',
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
					columnId: 'done',
					priority: 'medium',
					feature: 'Keybind Help Menu',
					points: 2,
				},
				{
					id: '5',
					title: 'Implement <?> keybind help modal',
					description:
						'Create modal that displays on <?> press with all current keybindings',
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
					columnId: 'todo',
					priority: 'medium',
					feature: 'Enhanced Navigation',
					points: 2,
				},
				{
					id: '7',
					title: 'Implement Shift+G (last card) keybind',
					description: 'Jump to last card in focused column',
					columnId: 'todo',
					priority: 'medium',
					feature: 'Enhanced Navigation',
					points: 2,
				},
				{
					id: '8',
					title: 'Implement PgDn/PgUp group navigation',
					description: 'Navigate through card groups with page up/down keys',
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
					columnId: 'todo',
					priority: 'high',
					feature: 'Card Sorting',
					points: 5,
				},
				{
					id: '10',
					title: 'Design sort & filter side panel UI',
					description: 'Panel with sort/filter options that opens on keypress',
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
					columnId: 'todo',
					priority: 'low',
					feature: 'Card Sorting',
					points: 2,
				},

				{
					id: '13',
					title: 'Define local config file schema',
					description: 'JSON/YAML schema for local board configuration in CWD',
					columnId: 'doing',
					priority: 'high',
					feature: 'Content Strategy - Local',
					points: 3,
				},
				{
					id: '14',
					title: 'Implement local config file reader',
					description:
						'Load and parse local config from current working directory',
					columnId: 'doing',
					priority: 'high',
					feature: 'Content Strategy - Local',
					points: 5,
				},
				{
					id: '15',
					title: 'Implement card move functionality (MVP)',
					description: 'Allow moving cards between columns with keybinds',
					columnId: 'todo',
					priority: 'high',
					feature: 'Content Strategy - Local',
					points: 8,
				},
				{
					id: '16',
					title: 'Implement add card functionality (post-MVP)',
					description: 'Create new cards via modal/prompt',
					columnId: 'todo',
					priority: 'low',
					feature: 'Content Strategy - Local',
					points: 5,
				},
				{
					id: '17',
					title: 'Implement delete card functionality (post-MVP)',
					description: 'Delete cards with confirmation prompt',
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
					columnId: 'todo',
					priority: 'medium',
					feature: 'Content Strategy - Jira',
					points: 3,
				},
				{
					id: '19',
					title: 'Implement Jira auth configuration',
					description: 'Collect and store Jira API credentials securely',
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
					columnId: 'todo',
					priority: 'medium',
					feature: 'Content Strategy - Jira',
					points: 3,
				},
				{
					id: '22',
					title: 'Implement Jira API integration',
					description: 'Fetch and sync cards from Jira API',
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
					columnId: 'todo',
					priority: 'medium',
					feature: 'Identity',
					points: 3,
				},
				{
					id: '25',
					title: 'Implement ownership filtering',
					description: 'Filter cards by ownership category in sort panel',
					columnId: 'todo',
					priority: 'low',
					feature: 'Identity',
					points: 2,
				},
				{
					id: '26',
					title: 'Plan dynamic keybinding system',
					description:
						'Design a system where keybindings change based on UI state (e.g., disable "q" when card detail is open, or repurpose it to close the overlay). Specify requirements for context-aware keybinds and how they are displayed.',
					columnId: 'todo',
					priority: 'high',
					feature: 'Dynamic Keybindings',
					points: 3,
				},
				{
					id: '27',
					title: 'Implement dynamic keybinding system',
					description:
						'Implement context-aware keybinding logic so that keybinds are enabled/disabled or repurposed based on the focused component. Update keybind display at the bottom of the terminal to reflect only active keybinds.',
					columnId: 'todo',
					priority: 'high',
					feature: 'Dynamic Keybindings',
					points: 8,
				},
				{
					id: '28',
					title: 'Implement card search/filter functionality',
					description:
						'Add a search feature that allows users to filter visible cards based on an input text string. The card list should update in real time as the user types. Ensure search is case-insensitive and matches card titles and descriptions.',
					columnId: 'todo',
					priority: 'medium',
					feature: 'Search',
					points: 5,
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
