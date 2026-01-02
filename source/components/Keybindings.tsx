import React from 'react';
import {Box, Text, useInput} from 'ink';
import {COLOR} from '../constants.js';
import {Command, useCommands} from '../context/CommandsContext.js';
import {Column} from '../core/models.js';

type Props = {
	focusedColumnIndex: number;
	setFocusedColumnIndex: (index: number | ((prev: number) => number)) => void;
	columns: Column[];
};

const Keybindings = ({setFocusedColumnIndex, columns}: Props) => {
	const {commands, dispatch} = useCommands();

	const displayedCommands = commands.filter(command => command.display);

	useInput((input, key) => {
		let trigger: string | undefined = input;
		if (key.leftArrow) trigger = 'leftArrow';
		else if (key.rightArrow) trigger = 'rightArrow';

		const cmd = commands.find(c => c.input.includes(trigger));
		if (cmd) {
			if (cmd.action.type === 'PREV_COLUMN') {
				setFocusedColumnIndex(
					prev => (prev - 1 + columns.length) % columns.length,
				);
			} else if (cmd.action.type === 'NEXT_COLUMN') {
				setFocusedColumnIndex(
					prev => (prev + 1 + columns.length) % columns.length,
				);
			} else {
				dispatch(cmd.action);
			}
		}
	});

	return (
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
