import React, {useState} from 'react';
import {Board} from '../../core/models.js';
import {ResizeAwareBox} from '../features/index.js';
import Keybindings from './Keybindings.js';
import Columns from './Columns.js';
import {DebugPanel} from './index.js';
import {useDebug} from '../../context/DebugContext.js';
import {Box} from '../shared/index.js';
import {useApp, useTheme} from '../../context/AppContext.js';

const Board = () => {
	const theme = useTheme();

	const {board} = useApp();
	if (!board) return null;

	const {debug} = useDebug();

	const [columnOffsets, setColumnOffsets] = useState(
		Array(board.columns.length).fill(0),
	);

	const Main = () => {
		return (
			<ResizeAwareBox
				borderStyle="round"
				borderTitle={`Board | ${board.name}`}
				borderColor={theme.SECONDARY}
				flexDirection="column"
			>
				<Columns
					columns={board.columns}
					cards={board.cards}
					columnOffsets={columnOffsets}
				/>
				<Keybindings columns={board.columns} />
			</ResizeAwareBox>
		);
	};

	if (debug) {
		return (
			<Box flexDirection="row">
				<Main />
				<DebugPanel />
			</Box>
		);
	}

	return <Main />;
};

export default Board;
