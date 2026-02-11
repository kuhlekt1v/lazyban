import {useMemo, useEffect} from 'react';

import {Column as IColumn, Card as ICard} from '../../core/models.js';
import {useApp} from '../../context/AppContext.js';

import {Box} from '../shared/index.js';

import {Column} from './index.js';

const Columns = () => {
	const {board} = useApp();
	const columns: IColumn[] = board.columns;

	return (
		<Box height={100}>
			{columns.map(column => {
				return <Column key={column.id} columnId={column.id} />;
			})}
		</Box>
	);
};
export default Columns;
