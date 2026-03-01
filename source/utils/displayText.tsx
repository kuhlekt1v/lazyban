export const displayText = (
	text: string | null | undefined,
	fallback: string = '\u00A0',
) => text ?? fallback;
