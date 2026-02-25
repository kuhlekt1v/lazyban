import {Text} from 'ink';
import {useApp} from '../../context/AppContext.js';
import {useFocus} from '../../context/FocusContext.js';
import {Card} from '../../core/models.js';
import Box from '../shared/Box.js';

type Props = {
	card: Card;
	boardName: string;
};

const Card = ({boardName, card}: Props) => {
	return (
		<Box width="100%" borderStyle="single" borderDimColor>
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
