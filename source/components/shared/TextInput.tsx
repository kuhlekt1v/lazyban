import {useState} from 'react';

import {Text, Box as InkBox, useInput} from 'ink';

type Props = {
	label: string;
	defaultValue?: string;
	onSubmit: (value: string) => void;
	onCancel?: () => void;
	helperText?: string;
	helperTextVisible?: boolean;
};

const TextInput = ({
	label,
	defaultValue = '',
	helperText,
	helperTextVisible = true,
	onSubmit,
	onCancel,
}: Props) => {
	const [value, setValue] = useState('');
	const defaultHelper = `Enter to accept default, type to edit, Backspace to delete${
		onCancel ? ', Esc to cancel' : ''
	}`;
	const displayHelper = helperText ?? defaultHelper;

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
		<InkBox flexDirection="column">
			<Text>{label}</Text>
			<InkBox marginTop={1}>
				<Text color="cyan">&gt; </Text>
				{value.length > 0 ? (
					<Text>{value}</Text>
				) : (
					<Text dimColor>{defaultValue}</Text>
				)}
				<Text color="cyan">_</Text>
			</InkBox>
			{helperTextVisible && (
				<InkBox marginTop={1}>
					<Text dimColor>{displayHelper}</Text>
				</InkBox>
			)}
		</InkBox>
	);
};

export default TextInput;
