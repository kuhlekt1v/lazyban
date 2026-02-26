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
}

export interface Command {
	title: string;
	input: string[];
	action: string;
	description: string;
	display: boolean;
}
