import React, {useState} from 'react';
import {Box, Text, useInput} from 'ink';

type Props = {
	message: string;
	onConfirm: (confirmed: boolean) => void;
};

export const ConfirmPrompt = ({message, onConfirm}: Props) => {
	const [selected, setSelected] = useState(true); // Default to "Yes"

	useInput((input, key) => {
		if (key.leftArrow || key.rightArrow || input === 'h' || input === 'l') {
			setSelected(prev => !prev);
		} else if (key.return) {
			onConfirm(selected);
		} else if (key.escape) {
			onConfirm(false);
		}
	});

	return (
		// @ts-ignore
		<Box flexDirection="column">
			<Text>{message}</Text>
			{/* @ts-ignore */}
			<Box marginTop={1}>
				<Text color={selected ? 'green' : 'gray'}>
					{selected ? '> ' : '  '}Yes
				</Text>
				<Text> / </Text>
				<Text color={!selected ? 'red' : 'gray'}>
					{!selected ? '> ' : '  '}No
				</Text>
			</Box>
			{/* @ts-ignore */}
			<Box marginTop={1}>
				<Text dimColor>
					Use ← → or h/l to select, Enter to confirm, Esc to cancel
				</Text>
			</Box>
		</Box>
	);
};
