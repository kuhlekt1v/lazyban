import React, {useState} from 'react';
import {COLOR} from '../constants.js';
import {Board} from '../core/models.js';
import {ResizeAwareBox} from './ResizeAwareBox.js';
import Keybindings from './Keybindings.js';
import Columns from './Columns.js';
import {DebugPanel} from './DebugPanel.js';

type Props = {
	board: Board;
};

const Board = ({board}: Props) => {
	const [focusedColumnIndex, setFocusedColumnIndex] = useState(0);
	const [columnOffsets, setColumnOffsets] = useState(
		Array(board.columns.length).fill(0),
	);

	return (
		<ResizeAwareBox
			borderStyle="round"
			borderTitle={`Board | ${board.name}`}
			borderColor={COLOR.SECONDARY}
			flexDirection="column"
		>
			<Columns
				columns={board.columns}
				cards={board.cards}
				focusedColumnIndex={focusedColumnIndex}
				columnOffsets={columnOffsets}
			/>
			<Keybindings
				setFocusedColumnIndex={setFocusedColumnIndex}
				columns={board.columns}
			/>
			<DebugPanel />
		</ResizeAwareBox>
	);
};

export default Board;
