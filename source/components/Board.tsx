import React, {useState} from 'react';
import {COLOR} from '../constants.js';
import {Board} from '../core/models.js';
import {ResizeAwareBox} from './ResizeAwareBox.js';
import Keybindings from './Keybindings.js';
import Columns from './Columns.js';
import {DebugPanel} from './DebugPanel.js';
import {useDebug} from '../context/DebugContext.js';
import Box from './Box.js';
import {useTheme} from '../context/AppEnvContext.js';

type Props = {
	board: Board;
};

const Board = ({board}: Props) => {
	const theme = useTheme();
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
				backgroundColor={theme.PRIMARY_BACKGROUND}
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
