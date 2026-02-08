import {BoxProps as InkBoxProps, Box as InkBox} from 'ink';
import {useTheme} from '../../context/AppContext.js';

/* Box resolves known error. Ink's Element type is not
 * assignabled to React.ReactNode, but safe in Ink CLI.
 */

type BoxProps = InkBoxProps & {
	transparent: boolean;
};

const Box = ({transparent = false, ...props}: BoxProps): Element => {
	const theme = useTheme();
	const boxProps = transparent
		? props
		: {...props, backgroundColor: theme.PRIMARY_BACKGROUND};
	// @ts-ignore
	return <InkBox {...boxProps} />;
};

export default Box;
