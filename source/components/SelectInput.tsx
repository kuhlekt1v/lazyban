import React, {useState} from 'react';
import {Box, Text, useInput} from 'ink';

type SelectOption = {
	label: string;
	value: string;
};

type Props = {
	label: string;
	options: SelectOption[];
	defaultValue?: string;
	onSelect: (value: string) => void;
	onCancel?: () => void;
};

export const SelectInput = ({
	label,
	options,
	defaultValue,
	onSelect,
	onCancel,
}: Props) => {
	const defaultIndex = defaultValue
		? options.findIndex(opt => opt.value === defaultValue)
		: 0;
	const [selectedIndex, setSelectedIndex] = useState(
		defaultIndex >= 0 ? defaultIndex : 0,
	);

	useInput((input, key) => {
		if (key.upArrow || input === 'k') {
			setSelectedIndex(prev => (prev > 0 ? prev - 1 : options.length - 1));
		} else if (key.downArrow || input === 'j') {
			setSelectedIndex(prev => (prev < options.length - 1 ? prev + 1 : 0));
		} else if (key.return) {
			onSelect(options[selectedIndex]!.value);
		} else if (key.escape) {
			if (onCancel) {
				onCancel();
			}
		}
	});

	return (
		// @ts-ignore
		<Box flexDirection="column">
			<Text>{label}</Text>
			{/* @ts-ignore */}
			<Box marginTop={1} flexDirection="column">
				{options.map((option, index) => (
					<Text
						key={option.value}
						color={index === selectedIndex ? 'cyan' : 'gray'}
					>
						{index === selectedIndex ? '> ' : '  '}
						{option.label}
					</Text>
				))}
			</Box>
			{/* @ts-ignore */}
			<Box marginTop={1}>
				<Text dimColor>
					Use ↑↓ or j/k to select, Enter to confirm
					{onCancel ? ', Esc to cancel' : ''}
				</Text>
			</Box>
		</Box>
	);
};
