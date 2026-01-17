/**
 * Shared ID type across the app
 * Allows providers to use strings, UUIDs, numeric IDs, etc.
 */
export type ID = string;

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

export interface Column {
	id: ID;
	name: string;
	order: number;

	cardIds: ID[];

	metadata?: Record<string, unknown>;
}

export interface Board {
	id: ID;
	name: string;

	columns: Column[];
	cards: Card[];

	metadata?: Record<string, unknown>;
}

export interface Command {
	title: string;
	input: string[];
	action: string;
	description: string;
	display: boolean;
}
