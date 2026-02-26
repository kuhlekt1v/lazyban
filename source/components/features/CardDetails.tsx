import {Text} from 'ink';
import {useApp, useTheme} from '../../context/AppContext.js';
import {useFocus} from '../../context/FocusContext.js';
import {Card, Priority as PriorityType} from '../../core/models.js';
import Box from '../shared/Box.js';
import Priority from '../shared/Priority.js';

type CardProps = {
	card: Card;
	boardName: string;
};

type DetailProps = {
	label: string;
	value: string;
};

const Detail = ({label, value}: DetailProps) => {
	return (
		<Box width="100%" flexDirection="row">
			<Text width="25%" bold>
				{label}:&nbsp;
			</Text>
			<Text width="75%">{value != null ? value : '-'}</Text>
		</Box>
	);
};

const PriorityLabel = ({priority}: {priority?: PriorityType}) => {
	const priorityLabel = priority
		? priority.replace(/^./, (char: string) => char.toUpperCase())
		: '';
	return priorityLabel ? (
		<>
			{priorityLabel}&nbsp;
			<Priority priority={priority} />
		</>
	) : (
		'-'
	);
};

const Card = ({boardName, card}: CardProps) => {
	return (
		<Box width="100%" marginX={1} flexDirection="column">
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
				<Text>{boardName} | Card Details</Text>
				<Text>[ESC]</Text>
			</Box>
			<Detail label="Title" value={card.title} />
			<Detail label="Feature" value={card.feature} />
			<Detail
				label="Priority"
				value={<PriorityLabel priority={card.priority} />}
			/>
		</Box>
	);
};

const CardDetails = () => {
	const {board, getCardById} = useApp();
	const {focusState} = useFocus();
	const card = focusState.active.cardId
		? getCardById(focusState.active.cardId)
		: undefined;

	return card ? (
		<Card card={card} boardName={board.name} />
	) : (
		<Text>No card selected</Text>
	);
};
export default CardDetails;
