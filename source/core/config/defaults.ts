export type BoardConfig = {
	provider: 'local' | 'jira';
	theme: 'light' | 'dark';
};

export const DEFAULT_CONFIG: BoardConfig = {
	provider: 'local',
	theme: 'dark',
};
