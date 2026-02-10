import {useMemo, useEffect, useRef} from 'react';

import {Column as IColumn, Card as ICard} from '../../core/models.js';
import {useFocus} from '../../context/FocusContext.js';
import {useApp} from '../../context/AppContext.js';

import {Box} from '../shared/index.js';

import {Column} from './index.js';

const Columns = () => {
	const {board} = useApp();
	const {setCardsPerColumn} = useFocus();

	const columns: IColumn[] = board.columns;
	const cards: ICard[] = board.cards;

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

	// Track previous value to avoid unnecessary updates
	const prevCardsPerColumnRef = useRef<number[]>([]);

	// Update cardsPerColumn in context only when values actually change
	useEffect(() => {
		const prev = prevCardsPerColumnRef.current;
		// Deep compare: check if array length or any value changed
		const hasChanged =
			prev.length !== cardsPerColumn.length ||
			cardsPerColumn.some((count, index) => count !== prev[index]);

		if (hasChanged) {
			setCardsPerColumn(cardsPerColumn);
			prevCardsPerColumnRef.current = cardsPerColumn;
		}
	}, [cardsPerColumn, setCardsPerColumn]);

	return (
		<Box height={100}>
			{columns.map(column => {
				return <Column key={column.id} columnId={column.id} />;
			})}
		</Box>
	);
};
export default Columns;
