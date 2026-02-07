import {Text, useInput} from 'ink';
import {Box} from './index.js';
import {useTheme} from '../../context/AppEnvContext.js';
import {OVERLAY_TYPE, useFocus} from '../../context/FocusContext.js';

type OverlayProps = {
	height: number;
	width: number;
};
const Overlay = ({height = 50, width = 50}: OverlayProps) => {
	const theme = useTheme();
	const heightPercent = `${height}%`;
	const widthPercent = `${width}%`;
	const {closeOverlay} = useFocus();

	useInput(
		(_, key) => {
			if (key.escape) {
				closeOverlay(OVERLAY_TYPE.DETAIL);
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
