import {Box, Text, useFocusManager, useInput} from 'ink';

import {Command} from '../../core/models.js';
import {COMMANDS} from '../../constants.js';

import {useApp, useTheme} from '../../context/AppContext.js';
import {FOCUS_ACTION} from '../../context/focusActions.js';
import {useDebug} from '../../context/DebugContext.js';
import {useFocus} from '../../context/FocusContext.js';

const Keybindings = () => {
	const theme = useTheme();
	const {
		nextColumn,
		prevColumn,
		nextCard,
		prevCard,
		expandCard,
		showQuitPrompt,
		openHelpMenu,
	} = useFocus();

	const {addStatement} = useDebug();
	const app = useApp();
	const {focus} = useFocusManager();

	const displayedCommands = COMMANDS.filter(command => command.display);

	useInput((input, key) => {
		let trigger: string | undefined = input;

		if (key.leftArrow) trigger = 'leftArrow';
		else if (key.downArrow) trigger = 'downArrow';
		else if (key.rightArrow) trigger = 'rightArrow';
		else if (key.upArrow) trigger = 'upArrow';
		else if (key.return) trigger = 'return';

		const cmd = COMMANDS.find(c => c.keys.includes(trigger));
		addStatement('Pressed', trigger);

		if (cmd) {
			switch (cmd.action) {
				case FOCUS_ACTION.QUIT:
					showQuitPrompt();
					focus('quit-prompt');
					break;
				case FOCUS_ACTION.NEXT_COL:
					nextColumn();
					break;

				case FOCUS_ACTION.PREV_COL:
					prevColumn();
					break;

				case FOCUS_ACTION.NEXT_CARD:
					nextCard();
					break;
				case FOCUS_ACTION.PREV_CARD:
					prevCard();
					break;

				case FOCUS_ACTION.EXPAND_CARD:
					expandCard(app.board);
					focus('overlay');

					break;

				case FOCUS_ACTION.KEYBINDINGS:
					openHelpMenu();
					focus('overlay');
					break;

				default:
					break;
			}
		}
	});

	return (
		// @ts-ignore
		<Box marginLeft={1}>
			{displayedCommands.map((command: Command, index: number) => {
				const inputToIcon = (input: string) => {
					switch (input) {
						case 'leftArrow':
							return '←';
						case 'rightArrow':
							return '→';
						case 'upArrow':
							return '↑';
						case 'downArrow':
							return '↓';
						default:
							return input;
					}
				};
				let inputDisplay = Array.isArray(command.keys)
					? command.keys.map(inputToIcon).join(',')
					: inputToIcon(command.keys);
				let title = `${inputDisplay}: ${command.title}`;
				if (index + 1 !== displayedCommands.length) title = `${title} | `;
				return (
					<Text key={index} color={theme.ALT_HIGHLIGHT}>
						{title}
					</Text>
				);
			})}
		</Box>
	);
};

export default Keybindings;
