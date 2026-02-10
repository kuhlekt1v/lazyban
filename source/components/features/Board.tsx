import {Board} from '../../core/models.js';

import {useApp, useTheme} from '../../context/AppContext.js';
import {useDebug} from '../../context/DebugContext.js';

import {ResizeAwareBox} from '../features/index.js';

import {Box} from '../shared/index.js';

import Keybindings from './Keybindings.js';
import Columns from './Columns.js';

import {DebugPanel} from './index.js';
const Board = () => {
	const theme = useTheme();
	const {board} = useApp();
	const {debug} = useDebug();

	const Main = () => {
		return (
			<ResizeAwareBox
				borderStyle="round"
				borderTitle={`Board | ${board.name}`}
				borderColor={theme.SECONDARY}
				flexDirection="column"
			>
				<Columns />
				<Keybindings />
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
