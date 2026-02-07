import {Text, useInput} from 'ink';
<<<<<<< HEAD:source/components/shared/Overlay.tsx
import {Box} from './index.js';
import {useTheme} from '../../context/AppEnvContext.js';
=======
import Box from './Box.js';
import {useTheme} from '../context/AppEnvContext.js';
import {useDebug} from '../context/DebugContext.js';
import {OVERLAY_TYPE, useFocus} from '../context/FocusContext.js';
>>>>>>> 7f74f9d (Fix overlay close logic & context usage):source/components/Overlay.tsx

type OverlayProps = {
	height: number;
	width: number;
};
const Overlay = ({height = 50, width = 50}: OverlayProps) => {
	const theme = useTheme();
	const heightPercent = `${height}%`;
	const widthPercent = `${width}%`;
<<<<<<< HEAD:source/components/shared/Overlay.tsx
=======
	const {closeOverlay} = useFocus();
	const {addStatement} = useDebug();
>>>>>>> 7f74f9d (Fix overlay close logic & context usage):source/components/Overlay.tsx

	useInput(
		(_, key) => {
			if (key.escape) {
				closeOverlay(OVERLAY_TYPE.DETAIL);
				addStatement('esc', 'pressed');
			}
		},
		{isActive: true},
	);

	return (
		<Box
			position="absolute"
			top={0}
			left={0}
			width="100%"
			height="100%"
			alignItems="center"
			justifyContent="center"
		>
			<Box
				borderStyle="round"
				borderColor={theme.PRIMARY}
				width={widthPercent}
				height={heightPercent}
				backgroundColor={theme.PRIMARY_BACKGROUND}
			>
				<Text>Esc to close</Text>
			</Box>
		</Box>
	);
};

export default Overlay;
