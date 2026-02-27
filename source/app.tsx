import {Board, CardDetails, QuitPrompt} from './components/features/index.js';
import {Box, Overlay} from './components/shared/index.js';
import {useTheme} from './context/AppContext.js';

import {OVERLAY_TYPE, useFocus} from './context/FocusContext.js';
import {useApp} from './context/AppContext.js';

export default function App() {
	const theme = useTheme();
	const {status} = useApp();
	const {focusState} = useFocus();

	// Define overlay configurations
	const overlays = [
		{
			isOpen: focusState.cardDetailOpen,
			type: OVERLAY_TYPE.DETAIL,
			id: 'overlay',
			component: CardDetails,
			height: 50,
			width: 50,
		},
		{
			isOpen: focusState.quitPromptOpen,
			type: OVERLAY_TYPE.QUIT,
			id: 'quit-prompt',
			component: QuitPrompt,
			height: 20,
			width: 60,
		},
	];

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
				{overlays.map(
					({isOpen, type, id, component: Component, height, width}) =>
						isOpen && (
							<Overlay
								key={id}
								id={id}
								height={height}
								width={width}
								overlayType={type}
							>
								<Component />
							</Overlay>
						),
				)}
			</Box>
		);
	}

	return null;
}
