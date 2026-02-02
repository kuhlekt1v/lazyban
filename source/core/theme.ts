export type Theme = {
	PRIMARY: string;
	SECONDARY: string;
	HIGHLIGHT: string;
	ALT_HIGHLIGHT: string;
	SECONDARY_DIM: string;
	YELLOW: string;
	ORANGE: string;
	RED: string;
	PRIMARY_BACKGROUND: string;
};

export const themes: Record<string, Theme> = {
	dark: {
		PRIMARY: '#79A0C9',
		SECONDARY: '#EAEBF2',
		HIGHLIGHT: '#A3D9A5',
		ALT_HIGHLIGHT: '#D6C8FF',
		SECONDARY_DIM: '#A8A9B3',
		YELLOW: '#FFF9C4',
		ORANGE: '#F6B26B',
		RED: '#E06666',
		PRIMARY_BACKGROUND: '#151515',
	},
	light: {
		PRIMARY: '#4F78A8',
		SECONDARY: '#2E2F36',
		HIGHLIGHT: '#5FAF74',
		ALT_HIGHLIGHT: '#8E7FD6',
		SECONDARY_DIM: '#6E707A',
		YELLOW: '#E6D98A',
		ORANGE: '#D8904C',
		RED: '#C75A5A',
		PRIMARY_BACKGROUND: '#E6E7EB',
	},
};
