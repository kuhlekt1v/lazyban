import {useMemo, useEffect} from 'react';
import {Column as IColumn, Card as ICard} from '../../core/models.js';
import {Column} from './index.js';
import {Box} from '../shared/index.js';
import {useFocus} from '../../context/FocusContext.js';
import {useApp} from '../../context/AppContext.js';

const Columns = () => {
	const {board} = useApp();
	const {focusState, setCardsPerColumn} = useFocus();

	const columns: IColumn[] = board.columns;
	const cards: ICard[] = board.cards;
	const columnOffsets = Array(columns.length).fill(0);

	// Compute cards per column
	const cardsPerColumn = useMemo(
		() =>
			columns.map(
				column =>
					cards.filter(card => card.columnId === column.name.toLowerCase())
						.length,
			),
		[columns, cards],
	);

	// Update cardsPerColumn in context when columns or cards change
	useEffect(() => {
		setCardsPerColumn(cardsPerColumn);
	}, [cardsPerColumn, setCardsPerColumn]);

	return (
		<Box height={100}>
			{columns.map((column, index) => {
				const columnCards = cards.filter(
					card => card.columnId === column.name.toLowerCase(),
				);
				return (
					<Column
						key={column.id}
						title={column.name}
						cards={columnCards}
						columnIndex={index}
						isFocused={index === focusState.active.columnIndex}
						offset={columnOffsets[index]}
					/>
				);
			})}
		</Box>
	);
};
export default Columns;
