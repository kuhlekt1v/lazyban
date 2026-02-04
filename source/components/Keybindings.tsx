import React from 'react';
import {Box, Text, useInput} from 'ink';
import {COMMANDS} from '../constants.js';
import {Column, Command} from '../core/models.js';
import {FOCUS_ACTION, useFocus} from '../context/FocusContext.js';
import {useDebug} from '../context/DebugContext.js';
import {useAppEnv, useTheme} from '../context/AppEnvContext.js';

type Props = {
	columns: Column[];
};

const Keybindings = ({columns}: Props) => {
	const theme = useTheme();
	const {nextColumn, prevColumn, nextCard, prevCard} = useFocus();
	const {addStatement} = useDebug();
	const {clear, unmount} = useAppEnv();

	const displayedCommands = COMMANDS.filter(command => command.display);

	useInput((input, key) => {
		let trigger: string | undefined = input;

		if (key.leftArrow) trigger = 'leftArrow';
		else if (key.downArrow) trigger = 'downArrow';
		else if (key.rightArrow) trigger = 'rightArrow';
		else if (key.upArrow) trigger = 'upArrow';

		const cmd = COMMANDS.find(c => c.input.includes(trigger));
		addStatement('Pressed', trigger);

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
					prevColumn();
					break;

				case FOCUS_ACTION.NEXT_CARD:
					nextCard();
					break;
				case FOCUS_ACTION.PREV_CARD:
					prevCard();
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
				let inputDisplay = Array.isArray(command.input)
					? command.input.map(inputToIcon).join(',')
					: inputToIcon(command.input);
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
