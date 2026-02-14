import {Text} from 'ink';
import {Card} from '../../core/models.js';
import {useApp} from '../../context/AppContext.js';
import {useFocus} from '../../context/FocusContext.js';

const CardDetails = () => {
	const {getCardById} = useApp();
	const {focusState} = useFocus();
	const card = focusState.active.cardId
		? getCardById(focusState.active.cardId)
		: undefined;

	return card ? <Text>{card.title}</Text> : <Text>No card selected</Text>;
};
export default CardDetails;
