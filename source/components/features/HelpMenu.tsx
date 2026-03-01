import {useState} from 'react';
import {Text, useInput} from 'ink';
import {useTheme} from '../../context/AppContext.js';
import {COMMANDS} from '../../constants.js';
import {Command} from '../../core/models.js';
import Box from '../shared/Box.js';

const KeybindingRow = ({
	command,
	isActive,
}: {
	command: Command;
	isActive: boolean;
}) => {
	const theme = useTheme();

	// Map special keys to symbols
	const keyToSymbol = (key: string): string => {
		switch (key) {
			case 'leftArrow':
				return '←';
			case 'rightArrow':
				return '→';
			case 'upArrow':
				return '↑';
			case 'downArrow':
				return '↓';
			case 'return':
				return 'Enter';
			default:
				return key;
		}
	};

	const keysDisplay = command.keys.map(keyToSymbol).join(', ');

	return (
		<Box
			width="100%"
			flexDirection="row"
			justifyContent="space-between"
			paddingX={1}
			borderColor={isActive ? theme.PRIMARY : undefined}
			borderStyle={isActive ? 'single' : undefined}
		>
			<Box flexDirection="row" width="70%">
				<Text bold color={theme.PRIMARY}>
					{keysDisplay.padEnd(12)}
				</Text>
				<Text>{command.title}</Text>
			</Box>
		</Box>
	);
};

const HelpMenu = () => {
	const theme = useTheme();
	const [activeIndex, setActiveIndex] = useState(0);

	// Get all commands (including those with display: false)
	const allCommands = COMMANDS;

	// Group commands by category
	const groupedCommands: {[key: string]: Command[]} = {};
	allCommands.forEach(cmd => {
		if (!groupedCommands[cmd.category]) {
			groupedCommands[cmd.category] = [];
		}
		groupedCommands[cmd.category].push(cmd);
	});

	useInput((input, key) => {
		if (key.downArrow || input === 'j') {
			setActiveIndex(prev => (prev + 1) % allCommands.length);
		} else if (key.upArrow || input === 'k') {
			setActiveIndex(
				prev => (prev - 1 + allCommands.length) % allCommands.length,
			);
		}
	});

	const activeCommand = allCommands[activeIndex];

	return (
		<Box width="100%" height="100%" flexDirection="column" marginX={1}>
			{/* Header */}
			<Box
				justifyContent="space-between"
				height={2}
				width="100%"
				borderStyle="single"
				borderDimColor
				borderLeft={false}
				borderRight={false}
				borderTop={false}
			>
				<Text>Keybindings</Text>
				<Text>[ESC]</Text>
			</Box>

			{/* Main scrollable content */}
			<Box width="100%" flexDirection="column" flexGrow={1} overflow="hidden">
				{Object.entries(groupedCommands).map(([category, cmds], catIndex) => (
					<Box key={category} width="100%" flexDirection="column">
						{/* Category header */}
						<Box width="100%" marginTop={catIndex > 0 ? 1 : 0}>
							<Text dimColor>─── {category} ───</Text>
						</Box>
						{/* Commands in this category */}
						{cmds.map((cmd, cmdIndex) => {
							const globalIndex = allCommands.indexOf(cmd);
							return (
								<KeybindingRow
									key={`${category}-${cmdIndex}`}
									command={cmd}
									isActive={globalIndex === activeIndex}
								/>
							);
						})}
					</Box>
				))}
			</Box>

			{/* Description section */}
			<Box width="100%" flexDirection="column" marginTop={1}>
				<Box
					width="100%"
					borderStyle="single"
					borderDimColor
					flexDirection="column"
					paddingX={1}
					minHeight={4}
				>
					<Text bold>Description:</Text>
					<Text wrap="wrap">{activeCommand.description}</Text>
				</Box>
			</Box>

			{/* Footer */}
			<Box
				width="100%"
				marginTop={1}
				borderStyle="single"
				borderDimColor
				borderLeft={false}
				borderRight={false}
				borderBottom={false}
			>
				<Text dimColor>↑↓/j,k: Navigate | ?, ESC : Close</Text>
			</Box>
		</Box>
	);
};

export default HelpMenu;
