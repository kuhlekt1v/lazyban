import {Text, useInput} from 'ink';
import Box from './Box.js';
import {COLOR} from '../constants.js';

type OverlayProps = {
	height: number;
	width: number;
	onClose: () => void;
};
const Overlay = ({onClose, height = 50, width = 50}: OverlayProps) => {
	const heightPercent = `${height}%`;
	const widthPercent = `${height}%`;

	useInput(
		(_, key) => {
			if (key.escape) onClose();
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
				borderColor={COLOR.PRIMARY}
				width={widthPercent}
				height={heightPercent}
				backgroundColor="black"
			>
				<Text>Esc to close</Text>
			</Box>
		</Box>
	);
};

export default Overlay;
