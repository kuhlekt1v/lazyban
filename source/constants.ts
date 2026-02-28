import {FOCUS_ACTION} from './context/focusActions.js';
import {Command} from './core/models.js';

export const LAYOUT = {
	/* CARD_HEIGHT includes 1 row each
	 * for top & bottom border line.
	 */
	CARD_HEIGHT: 7,
	HEADER_HEIGHT: 1,
	FOOTER_HEIGHT: 2,
	TOTAL_COLUMN: 4,
};

export const COMMANDS: Command[] = [
	{
		title: 'Quit',
		keys: ['q'],
		action: FOCUS_ACTION.QUIT,
		description: 'Clear terminal and quit application.',
		category: 'General',
		display: true,
	},
	{
		title: 'Toggle help menu',
		keys: ['?'],
		action: FOCUS_ACTION.KEYBINDINGS,
		description: 'Show or hide the help menu with keybindings.',
		category: 'General',
		display: true,
	},
	{
		title: 'Previous column',
		keys: ['h', 'leftArrow'],
		action: FOCUS_ACTION.PREV_COL,
		description:
			'Move focus to the previous column. Wraps to last column at beginning.',
		category: 'Column Navigation',
		display: true,
	},
	{
		title: 'Next column',
		keys: ['l', 'rightArrow'],
		action: FOCUS_ACTION.NEXT_COL,
		description:
			'Move focus to the next column. Wraps to first column at end.',
		category: 'Column Navigation',
		display: true,
	},
	{
		title: 'Previous card',
		keys: ['k', 'upArrow'],
		action: FOCUS_ACTION.PREV_CARD,
		description:
			'Move focus to the previous card in the current column. Wraps to last card at top.',
		category: 'Card Navigation',
		display: true,
	},
	{
		title: 'Next card',
		keys: ['j', 'downArrow'],
		action: FOCUS_ACTION.NEXT_CARD,
		description:
			'Move focus to the next card in the current column. Wraps to first card at bottom.',
		category: 'Card Navigation',
		display: true,
	},
	{
		title: 'View card details',
		keys: ['return'],
		action: FOCUS_ACTION.EXPAND_CARD,
		description: 'Open detailed view of the selected card.',
		category: 'Card Actions',
		display: false,
	},
];
