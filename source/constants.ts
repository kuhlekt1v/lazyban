import {FOCUS_ACTION} from './context/FocusContext.js';
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
		input: ['q'],
		action: FOCUS_ACTION.QUIT,
		description: 'Clear terminal and quit application.',
		display: true,
	},
	{
		title: 'Keybindings',
		input: ['?'],
		action: FOCUS_ACTION.KEYBINDINGS,
		description: '',
		display: true,
	},
	{
		title: 'Prev. Column',
		input: ['h', 'leftArrow'],
		action: FOCUS_ACTION.PREV_COL,
		description: 'Move focus to previous column.',
		display: true,
	},
	{
		title: 'Next Column',
		input: ['l', 'rightArrow'],
		action: FOCUS_ACTION.NEXT_COL,
		description: 'Move focus to next column.',
		display: true,
	},
	{
		title: 'Prev. Card',
		input: ['k', 'upArrow'],
		action: FOCUS_ACTION.PREV_CARD,
		description: 'Move focus up to previous card in active column.',
		display: true,
	},
	{
		title: 'Next Card',
		input: ['j', 'downArrow'],
		action: FOCUS_ACTION.NEXT_CARD,
		description: 'Move focus up to next card in active column.',
		display: true,
	},
	{
		title: 'Expand Card Details',
		input: ['return'],
		action: FOCUS_ACTION.EXPAND_CARD,
		description: 'Expand card to view full details.',
		display: false,
	},
];
