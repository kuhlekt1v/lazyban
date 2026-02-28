import {Box} from '../shared/index.js';
import {Text, useInput} from 'ink';
import {useApp, useTheme} from '../../context/AppContext.js';
import {OVERLAY_TYPE, useFocus} from '../../context/FocusContext.js';
import {useFocusManager} from 'ink';

const QuitPrompt = () => {
	const theme = useTheme();
	const app = useApp();
	const {closeOverlay} = useFocus();
	const {focus} = useFocusManager();

	useInput((input, _key) => {
		if (input === 'q') {
			// Quit confirmed
			app.clear();
			app.unmount();
		} else {
			// Cancel quit
			closeOverlay(OVERLAY_TYPE.QUIT);
			focus('board');
		}
	});

	return (
		<Box
			flexDirection="column"
			justifyContent="center"
			width="100%"
			height="100%"
			marginX={1}
		>
			<Text color={theme.ALT_HIGHLIGHT}>Are you sure you want to quit?</Text>
			<Text dimColor>Press [q] again to quit or any other key to cancel.</Text>
		</Box>
	);
};

export default QuitPrompt;
