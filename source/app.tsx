import {Board, CardDetails, HelpMenu} from './components/features/index.js';
import {Box, Overlay} from './components/shared/index.js';
import {useTheme} from './context/AppContext.js';

import {useFocus} from './context/FocusContext.js';
import {useApp} from './context/AppContext.js';
import {OVERLAY_TYPE} from './context/FocusContext.js';

export default function App() {
	const theme = useTheme();
	const {status} = useApp();
	const {focusState} = useFocus();

	// TODO: Enable these when multi-board support is implemented
	// if (status === 'create') return <Text>Prompt: Create a new board</Text>;
	// if (status === 'select') return <Text>Prompt: Select a board</Text>;
	if (status === 'show') {
		return (
			<Box
				width="100%"
				height="100%"
				backgroundColor={theme.PRIMARY_BACKGROUND}
			>
				<Board id="board" />
				{focusState.cardDetailOpen && (
					<Overlay
						id="overlay"
						height={95}
						transparent={false}
						overlayType={OVERLAY_TYPE.DETAIL}
					>
						<CardDetails />
					</Overlay>
				)}
				{focusState.helpMenuOpen && (
					<Overlay
						id="overlay"
						height={95}
						transparent={false}
						overlayType={OVERLAY_TYPE.HELP}
					>
						<HelpMenu />
					</Overlay>
				)}
			</Box>
		);
	}

	return null;
}
