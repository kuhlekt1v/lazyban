import React, {useState} from 'react';
import {Box, Text, useInput} from 'ink';

type Props = {
	label: string;
	defaultValue?: string;
	onSubmit: (value: string) => void;
	onCancel?: () => void;
};

export const TextInput = ({
	label,
	defaultValue = '',
	onSubmit,
	onCancel,
}: Props) => {
	const [value, setValue] = useState(defaultValue);

	useInput((input, key) => {
		if (key.return) {
			onSubmit(value || defaultValue);
		} else if (key.escape) {
			if (onCancel) {
				onCancel();
			}
		} else if (key.backspace || key.delete) {
			setValue(prev => prev.slice(0, -1));
		} else if (!key.ctrl && !key.meta && input) {
			setValue(prev => prev + input);
		}
	});

	return (
		// @ts-ignore
		<Box flexDirection="column">
			<Text>{label}</Text>
			{/* @ts-ignore */}
			<Box marginTop={1}>
				<Text color="cyan">&gt; </Text>
				<Text>{value || defaultValue}</Text>
				<Text color="cyan">_</Text>
			</Box>
			{/* @ts-ignore */}
			<Box marginTop={1}>
				<Text dimColor>
					Enter to confirm{onCancel ? ', Esc to cancel' : ''}
				</Text>
			</Box>
		</Box>
	);
};
