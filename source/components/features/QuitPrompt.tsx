import {Box, Text, useInput} from 'ink';
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
		// @ts-ignore
		<Box
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			height="100%"
		>
			{/* @ts-ignore */}
			<Box flexDirection="column" alignItems="center">
				<Text color={theme.ALT_HIGHLIGHT}>
					Are you sure you want to quit?
				</Text>
				{/* @ts-ignore */}
				<Box marginTop={1}>
					<Text dimColor>Press [q] again to quit or any other key to cancel.</Text>
				</Box>
			</Box>
		</Box>
	);
};

export default QuitPrompt;
