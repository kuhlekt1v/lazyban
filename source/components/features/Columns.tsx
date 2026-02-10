import {useMemo, useEffect} from 'react';

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

	// Update cardsPerColumn in context when columns or cards change
	useEffect(() => {
		setCardsPerColumn(cardsPerColumn);
	}, [cardsPerColumn]); // setCardsPerColumn is memoized and stable, no need in deps

	return (
		<Box height={100}>
			{columns.map(column => {
				return <Column key={column.id} columnId={column.id} />;
			})}
		</Box>
	);
};
export default Columns;
