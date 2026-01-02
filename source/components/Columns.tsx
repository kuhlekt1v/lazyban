import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {Column as IColumn, Card as ICard} from '../core/models.js';
import Column from './Column.js';
import {Box, Text, useStdout} from 'ink';
import {useDebug} from '../context/DebugContext.js';

type Props = {
	columns: IColumn[];
	cards: ICard[];
	focusedColumnIndex: number;
	columnOffsets: number[];
};

const Columns = ({
	columns,
	cards,
	focusedColumnIndex,
	columnOffsets,
}: Props) => {
	const debug = useDebug();
	const {stdout} = useStdout();

	// Keep rows in state so component re-renders
	const [rows, setRows] = useState(stdout.rows);

	useEffect(() => {
		// Handler when terminal resizes
		const handleResize = () => {
			setRows(stdout.rows);
		};

		// Ink's stdout emits 'resize' event
		stdout.on('resize', handleResize);

		// Cleanup listener
		return () => {
			stdout.off('resize', handleResize);
		};
	}, [stdout]);

	useEffect(() => {
		debug.addStatement(`Column Container rows: ${rows}`);
	}, [rows]);

	return (
		<Box>
			{columns.map((column, idx) => (
				<Column
					key={column.id}
					title={column.name}
					cards={cards}
					isFocused={idx === focusedColumnIndex}
					offset={columnOffsets[idx]}
				/>
			))}
		</Box>
	);
};
export default Columns;
