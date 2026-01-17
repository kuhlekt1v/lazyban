import React from 'react';
import {Box, Text, useInput} from 'ink';
import {COLOR, COMMANDS} from '../constants.js';
import {Column} from '../core/models.js';
import {FOCUS_ACTION, useFocus} from '../context/FocusContext.js';
import {useDebug} from '../context/DebugContext.js';
import {useAppEnv} from '../context/AppEnvContext.js';

type Props = {
	focusedColumnIndex: number;
	setFocusedColumnIndex: (index: number | ((prev: number) => number)) => void;
	columns: Column[];
};

const Keybindings = ({columns}: Props) => {
	const {nextColumn} = useFocus();
	const {addStatement} = useDebug();
	const {clear, unmount} = useAppEnv();

	const displayedCommands = COMMANDS.filter(command => command.display);

	useInput((input, key) => {
		let trigger: string | undefined = input;
		if (key.leftArrow) trigger = 'leftArrow';
		else if (key.rightArrow) trigger = 'rightArrow';

		const cmd = COMMANDS.find(c => c.input.includes(trigger));

		if (cmd) {
			switch (cmd.action) {
				case FOCUS_ACTION.QUIT:
					clear();
					unmount();
					break;
				case FOCUS_ACTION.NEXT_COL:
					nextColumn();
					break;

				case FOCUS_ACTION.PREV_COL:
					break;

				case 'PREV_CARD':
					// dispatch({
					// 	type: 'PREV_CARD',
					// 	cardCount: visibleCards.length,
					// });
					break;

				case 'NEXT_CARD':
					// dispatch({
					// 	type: 'NEXT_CARD',
					// 	cardCount: visibleCards.length,
					// });
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
				let title = `${
					Array.isArray(command.input) ? command.input.join(',') : command.input
				}: ${command.title}`;
				if (index + 1 !== displayedCommands.length) title = `${title} | `;
				return (
					<Text key={index} color={COLOR.ALT_HIGHLIGHT}>
						{title}
					</Text>
				);
			})}
		</Box>
	);
};

export default Keybindings;
