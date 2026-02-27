import {useState} from 'react';
import {Text, useInput} from 'ink';
import {useTheme} from '../../context/AppContext.js';
import {COMMANDS} from '../../constants.js';
import Box from '../shared/Box.js';

type Keybinding = {
	title: string;
	keys: string[];
	description: string;
	category: string;
};

const keybindings: Keybinding[] = [
	{
		title: 'Previous column',
		keys: ['h', '←'],
		description:
			'Move focus to the previous column. Wraps to last column at beginning.',
		category: 'Column Navigation',
	},
	{
		title: 'Next column',
		keys: ['l', '→'],
		description:
			'Move focus to the next column. Wraps to first column at end.',
		category: 'Column Navigation',
	},
	{
		title: 'Next card',
		keys: ['j', '↓'],
		description:
			'Move focus to the next card in the current column. Wraps to first card at bottom.',
		category: 'Card Navigation',
	},
	{
		title: 'Previous card',
		keys: ['k', '↑'],
		description:
			'Move focus to the previous card in the current column. Wraps to last card at top.',
		category: 'Card Navigation',
	},
	{
		title: 'First card in column',
		keys: ['gg'],
		description: 'Jump to the first card in the current column.',
		category: 'Card Navigation',
	},
	{
		title: 'Last card in column',
		keys: ['G'],
		description: 'Jump to the last card in the current column.',
		category: 'Card Navigation',
	},
	{
		title: 'Next group of cards',
		keys: ['PgDn'],
		description: 'Scroll down to the next group of visible cards.',
		category: 'Card Navigation',
	},
	{
		title: 'Previous group of cards',
		keys: ['PgUp'],
		description: 'Scroll up to the previous group of visible cards.',
		category: 'Card Navigation',
	},
	{
		title: 'View card details',
		keys: ['Enter'],
		description: 'Open detailed view of the selected card.',
		category: 'Card Actions',
	},
	{
		title: 'Toggle this help menu',
		keys: ['?'],
		description: 'Show or hide the help menu with keybindings.',
		category: 'General',
	},
	{
		title: 'Quit',
		keys: ['q'],
		description: 'Clear terminal and quit application.',
		category: 'General',
	},
];

const KeybindingRow = ({
	keybinding,
	isActive,
}: {
	keybinding: Keybinding;
	isActive: boolean;
}) => {
	const theme = useTheme();
	const keysDisplay = keybinding.keys.join(', ');

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
				<Text>{keybinding.title}</Text>
			</Box>
		</Box>
	);
};

const HelpMenu = () => {
	const theme = useTheme();
	const [activeIndex, setActiveIndex] = useState(0);

	// Group keybindings by category
	const groupedKeybindings: {[key: string]: Keybinding[]} = {};
	keybindings.forEach(kb => {
		if (!groupedKeybindings[kb.category]) {
			groupedKeybindings[kb.category] = [];
		}
		groupedKeybindings[kb.category].push(kb);
	});

	useInput((input, key) => {
		if (key.downArrow || input === 'j') {
			setActiveIndex(prev => (prev + 1) % keybindings.length);
		} else if (key.upArrow || input === 'k') {
			setActiveIndex(
				prev => (prev - 1 + keybindings.length) % keybindings.length,
			);
		}
	});

	const activeKeybinding = keybindings[activeIndex];

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
				{Object.entries(groupedKeybindings).map(([category, kbs], catIndex) => (
					<Box key={category} width="100%" flexDirection="column">
						{/* Category header */}
						<Box width="100%" marginTop={catIndex > 0 ? 1 : 0}>
							<Text dimColor>─── {category} ───</Text>
						</Box>
						{/* Keybindings in this category */}
						{kbs.map((kb, kbIndex) => {
							const globalIndex = keybindings.indexOf(kb);
							return (
								<KeybindingRow
									key={`${category}-${kbIndex}`}
									keybinding={kb}
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
					<Text wrap="wrap">{activeKeybinding.description}</Text>
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
