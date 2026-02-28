/**
 * Shared ID type across the app
 * Allows providers to use strings, UUIDs, numeric IDs, etc.
 */
export type ID = string;

export type provider = 'local' | 'jira';

export type theme = 'dark' | 'light';

export interface BoardConfig {
	provider: provider;
	theme: theme;
	name: string;
}

/* TODO Revise so that cards
 * are element of Column.
 */
export interface Board {
	id: ID;
	name: string;
	columns: Column[];
	cards: Card[];
}

export interface Column {
	id: ID;
	name: string;
	order: number;
}

export type Priority = 'low' | 'medium' | 'high';

export interface Comment {
	author: string;
	text: string;
	/** ISO 8601 formatted timestamp */
	createdAt: string;
}

export interface Card {
	id: ID;
	title: string;
	description?: string;

	columnId: ID;
	assignee?: string;
	labels?: string[];
	priority?: Priority;
	feature?: string;
	points?: number;
	dueDate?: string;
	comments?: Comment[];
}

export interface Command {
	title: string;
	keys: string[];
	action: string;
	description: string;
	category: string;
	display: boolean;
}
