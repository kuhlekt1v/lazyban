/**models
 * Shared ID type across the app
 * Allows providers to use strings, UUIDs, numeric IDs, etc.
 */
export type ID = string;

export type AppEnv = {
	clear: () => void;
	unmount: () => void;
};

/**
 * Kanban Card (Issue / Task / Work Item)
 */
export interface Card {
	id: ID;
	title: string;
	description?: string;

	columnId: ID;
	boardId: ID;

	assignee?: string;
	labels?: string[];
	priority: 'low' | 'medium' | 'high';
	feature?: string;
	points?: number;
	/**
	 * Provider-specific data (never used by UI directly)
	 */
	metadata?: Record<string, unknown>;
}

/**
 * Column / Lane
 */
export interface Column {
	id: ID;
	name: string;
	order: number;

	cardIds: ID[];

	metadata?: Record<string, unknown>;
}

/**
 * Board
 */
export interface Board {
	id: ID;
	name: string;

	columns: Column[];
	cards: Card[];

	metadata?: Record<string, unknown>;
}
