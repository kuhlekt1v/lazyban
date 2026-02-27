import {Text} from 'ink';
import {Box, Priority} from '../shared/index.js';
import {Card as ICard} from '../../core/models.js';
import {useTheme} from '../../context/AppContext.js';
import {getPriority} from '../../utils/priorityMap.js';
import {displayText} from '../../utils/displayText.js';

type CardProps = {
	card: ICard;
	isActive: boolean;
};

const Card = ({card, isActive}: CardProps) => {
	const theme = useTheme();
	const priority = getPriority(theme, card.priority);

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
				<Priority priority={card.priority} />
				<Text>{displayText(card.points as unknown as string, '-')}</Text>
			</Text>
		</Box>
	);
};

export default Card;
