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
	const [value, setValue] = useState('');

	useInput((input, key) => {
		if (key.return) {
			onSubmit(value || defaultValue);
		} else if (key.escape) {
			if (onCancel) {
				onCancel();
			}
		} else if (key.backspace || key.delete) {
			setValue(prev => {
				if (prev.length === 0) {
					// If already empty, don't prevent further backspace
					return '';
				}
				return prev.slice(0, -1);
			});
		} else if (!key.ctrl && !key.meta && input) {
			setValue(prev => prev + input);
		}
	});

	const displayValue = value.length > 0 ? value : defaultValue;

	return (
		// @ts-ignore
		<Box flexDirection="column">
			<Text>{label}</Text>
			{/* @ts-ignore */}
			<Box marginTop={1}>
				<Text color="cyan">&gt; </Text>
				{value.length > 0 ? (
					<Text>{value}</Text>
				) : (
					<Text dimColor>{defaultValue}</Text>
				)}
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
