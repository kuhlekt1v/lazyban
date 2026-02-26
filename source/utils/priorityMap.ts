/**
 * Returns the priority object for a given priority key.
 * The priority object contains a color and a value string.
 * If the key is not found or priorityKey is undefined, returns undefined.
 *
 * @param theme - The theme object containing color values.
 * @param priorityKey - The priority level ('low', 'medium', 'high') or undefined.
 * @returns The priority object or undefined.
 */
export type PriorityKey = 'low' | 'medium' | 'high';

export function getPriority(
	theme: any,
	priorityKey?: string,
): {color: any; value: string} | undefined {
	const map: Record<PriorityKey, {color: any; value: string}> = {
		low: {color: theme.YELLOW, value: '[!  ]  '},
		medium: {color: theme.ORANGE, value: '[!! ]  '},
		high: {color: theme.RED, value: '[!!!]  '},
	};
	if (!priorityKey) return undefined;
	return map[priorityKey as PriorityKey];
}
