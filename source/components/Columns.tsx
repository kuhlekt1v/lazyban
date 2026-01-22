import React from 'react';
import {Column as IColumn, Card as ICard} from '../core/models.js';
import Column from './Column.js';
import Box from './Box.js';
import {useFocus} from '../context/FocusContext.js';

type Props = {
	columns: IColumn[];
	cards: ICard[];
	columnOffsets: number[];
};

const Columns = ({columns, cards, columnOffsets}: Props) => {
	const {focusState, setCardsPerColumn} = useFocus();

	// Compute cards per column
	const cardsPerColumn = React.useMemo(
		() =>
			columns.map(
				column =>
					cards.filter(card => card.columnId === column.name.toLowerCase())
						.length,
			),
		[columns, cards],
	);

	// Update cardsPerColumn in context when columns or cards change
	React.useEffect(() => {
		setCardsPerColumn(cardsPerColumn);
	}, [cardsPerColumn, setCardsPerColumn]);

	return (
		<Box>
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
