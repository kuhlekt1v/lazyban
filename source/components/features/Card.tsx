import {Text} from 'ink';
import {Box} from '../shared/index.js';
import {Card as ICard} from '../../core/models.js';
import {useTheme} from '../../context/AppContext.js';

type CardProps = {
	card: ICard;
	isActive: boolean;
};

const displayText = (
	text: string | null | undefined,
	replacement: Element = <Text>&nbsp;</Text>,
) => <Text>{text || replacement}</Text>;

const Card = ({card, isActive}: CardProps) => {
	const theme = useTheme();
	const priorityMap: Record<string, {color: string; value: string}> = {
		low: {color: theme.YELLOW, value: '[!  ]  '},
		medium: {color: theme.ORANGE, value: '[!! ]  '},
		high: {color: theme.RED, value: '[!!!]  '},
	};
	const priority = card.priority && priorityMap[card.priority];

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
			<Text wrap="truncate">{displayText(`${card.id}: ${card.title}`)}</Text>
			<Text backgroundColor={theme.HIGHLIGHT} color="black">
				{displayText(card.feature)}
			</Text>
			<Text wrap="truncate">{displayText(card.description)}</Text>
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
