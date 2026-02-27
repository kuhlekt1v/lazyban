import {Box} from './index.js';
import {useFocusManager, useInput} from 'ink';
import {useTheme} from '../../context/AppContext.js';
import {OVERLAY_TYPE, useFocus} from '../../context/FocusContext.js';
import {ReactNode} from 'react';

type OverlayProps = {
	height: number;
	width: number;
	children: ReactNode;
	transparent?: boolean;
	overlayType: keyof typeof OVERLAY_TYPE;
};
const Overlay = ({
	height = 50,
	width = 50,
	transparent = true,
	overlayType,
	children,
}: OverlayProps) => {
	const theme = useTheme();
	const heightPercent = `${height}%`;
	const widthPercent = `${width}%`;
	const {focus} = useFocusManager();
	const {closeOverlay} = useFocus();

	useInput((input, key) => {
		if (key.escape || input === '?') {
			focus('board');
			closeOverlay(overlayType);
		}
	});

	return (
		<Box
			position="absolute"
			top={0}
			left={0}
			width="100%"
			height="100%"
			alignItems="center"
			justifyContent="center"
			transparent={transparent}
		>
			<Box
				borderStyle="round"
				borderColor={theme.PRIMARY}
				width={widthPercent}
				height={heightPercent}
				backgroundColor={theme.PRIMARY_BACKGROUND}
			>
				{children}
			</Box>
		</Box>
	);
};

export default Overlay;
