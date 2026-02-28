import {Text, useStdout} from 'ink';
import {Box} from '../shared/index.js';
import {Card as ICard} from '../../core/models.js';
import {useTheme} from '../../context/AppContext.js';
import {LAYOUT} from '../../constants.js';

type CardProps = {
	card: ICard;
	isActive: boolean;
};

const displayText = (
	text: string | null | undefined,
	replacement: Element = <Text>&nbsp;</Text>,
) => <Text>{text || replacement}</Text>;

/**
 * Truncate text to fit within a specified character width per line and max number of lines.
 * Adds ellipsis (...) at the end if text is truncated.
 */
const truncateText = (
	text: string | null | undefined,
	maxWidth: number,
	maxLines: number = 1,
): string => {
	if (!text) return '';

	const lines: string[] = [];
	let remainingText = text;

	for (let i = 0; i < maxLines; i++) {
		if (remainingText.length === 0) break;

		if (i === maxLines - 1) {
			// Last line - add ellipsis if text continues
			if (remainingText.length > maxWidth) {
				lines.push(remainingText.slice(0, maxWidth - 3) + '...');
			} else {
				lines.push(remainingText);
			}
		} else {
			// Not the last line
			if (remainingText.length > maxWidth) {
				// Find the last space before maxWidth to avoid breaking words
				const slice = remainingText.slice(0, maxWidth);
				const lastSpaceIndex = slice.lastIndexOf(' ');

				if (lastSpaceIndex > maxWidth * 0.7) {
					// If we found a space in the last 30% of the line, break there
					lines.push(remainingText.slice(0, lastSpaceIndex));
					remainingText = remainingText.slice(lastSpaceIndex + 1);
				} else {
					// Otherwise, just hard break at maxWidth
					lines.push(remainingText.slice(0, maxWidth));
					remainingText = remainingText.slice(maxWidth);
				}
			} else {
				lines.push(remainingText);
				remainingText = '';
			}
		}
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

	// Calculate approximate width for truncation based on terminal width
	// Terminal width / number of columns - borders (2) - padding (2) - spacing (~2)
	const cardWidth = Math.floor(stdout.columns / LAYOUT.TOTAL_COLUMN) - 6;

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
			minHeight={6}
		>
			<Text>{truncateText(`${card.id}: ${card.title}`, cardWidth) || '\u00A0'}</Text>
			<Text backgroundColor={theme.HIGHLIGHT} color="black">
				{displayText(card.feature)}
			</Text>
			<Text>{truncateText(card.description, cardWidth, 2) || '\u00A0'}</Text>
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
