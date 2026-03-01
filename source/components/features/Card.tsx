import {Text, useStdout} from 'ink';
import {Box} from '../shared/index.js';
import {Card as ICard} from '../../core/models.js';
import {useTheme} from '../../context/AppContext.js';
import {LAYOUT} from '../../constants.js';
import {displayText} from '../../utils/displayText.js';

type CardProps = {
	card: ICard;
	isActive: boolean;
};

/**
 * Truncate text to fit within a specified character width per line and max number of lines.
 * Adds ellipsis (...) at the end if text is truncated.
 * Pads output with empty lines to ensure exactly maxLines are returned.
 */
const truncateText = (
	text: string | null | undefined,
	maxWidth: number,
	maxLines: number = 1,
): string => {
	if (!text) {
		// Return empty lines to maintain fixed height
		return Array(maxLines).fill('').join('\n');
	}

	// Clamp maxWidth to safe minimum for ellipsis handling
	const safeWidth = Math.max(maxWidth, 4);

	const lines: string[] = [];
	let remainingText = text;

	for (let i = 0; i < maxLines; i++) {
		if (remainingText.length === 0) break;

		if (i === maxLines - 1) {
			// Last line - add ellipsis if text continues, with word-boundary awareness
			if (remainingText.length > safeWidth) {
				const slice = remainingText.slice(0, safeWidth - 3);
				const lastSpaceIndex = slice.lastIndexOf(' ');

				// Try to break at word boundary if space exists in last 30% of slice
				if (lastSpaceIndex > (safeWidth - 3) * 0.7) {
					lines.push(remainingText.slice(0, lastSpaceIndex) + '...');
				} else {
					lines.push(slice + '...');
				}
			} else {
				lines.push(remainingText);
			}
		} else {
			// Not the last line
			if (remainingText.length > safeWidth) {
				// Find the last space before maxWidth to avoid breaking words
				const slice = remainingText.slice(0, safeWidth);
				const lastSpaceIndex = slice.lastIndexOf(' ');

				if (lastSpaceIndex > safeWidth * 0.7) {
					// If we found a space in the last 30% of the line, break there
					lines.push(remainingText.slice(0, lastSpaceIndex));
					remainingText = remainingText.slice(lastSpaceIndex + 1);
				} else {
					// Otherwise, just hard break at maxWidth
					lines.push(remainingText.slice(0, safeWidth));
					remainingText = remainingText.slice(safeWidth);
				}
			} else {
				lines.push(remainingText);
				remainingText = '';
			}
		}
	}

	// Pad with empty lines to ensure exactly maxLines
	while (lines.length < maxLines) {
		lines.push('');
	}

	return lines.join('\n');
};

const Card = ({card, isActive}: CardProps) => {
	const theme = useTheme();
	const {stdout} = useStdout();
	const priorityMap: Record<string, {color: string; value: string}> = {
		low: {color: theme.YELLOW, value: '[!  ]  '},
		medium: {color: theme.ORANGE, value: '[!! ]  '},
		high: {color: theme.RED, value: '[!!!]  '},
	};
	const priority = card.priority && priorityMap[card.priority];

	// Calculate card width with fallback and validation
	const DEFAULT_TERMINAL_WIDTH = 80;
	const MIN_CARD_WIDTH = 10;
	const terminalWidth =
		typeof stdout?.columns === 'number' &&
		Number.isFinite(stdout.columns) &&
		stdout.columns > 0
			? stdout.columns
			: DEFAULT_TERMINAL_WIDTH;
	const approximateCardWidth =
		Math.floor(terminalWidth / LAYOUT.TOTAL_COLUMN) - 6;
	const cardWidth = Math.max(approximateCardWidth, MIN_CARD_WIDTH);

	return (
		<Box
			display="flex"
			paddingX={1}
			paddingY={0}
			flexDirection="column"
			justifyContent="flex-start"
			borderStyle="single"
			borderColor={isActive ? theme.PRIMARY : theme.SECONDARY}
			width="100%"
			height={LAYOUT.CARD_HEIGHT}
			flexShrink={0}
		>
			<Text>{truncateText(`${card.id}: ${card.title}`, cardWidth, 1)}</Text>
			<Text backgroundColor={theme.HIGHLIGHT} color="black">
				{truncateText(card.feature, cardWidth, 1) || '\u00A0'}
			</Text>
			<Text>{truncateText(card.description, cardWidth, 2)}</Text>
			<Text>
				<Text color={priority?.color}>
					{displayText(priority?.value, '[   ]  ')}
				</Text>
				<Text>{displayText(card.points as unknown as string, '-')}</Text>
			</Text>
		</Box>
	);
};

export default Card;
