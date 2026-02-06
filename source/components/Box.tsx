import React from 'react';
import {BoxProps, Box as InkBox} from 'ink';
import {useTheme} from '../context/AppEnvContext.js';

/* Box resolves known error. Ink's Element type is not
 * assignabled to React.ReactNode, but safe in Ink CLI.
 */

const Box = (props: BoxProps): Element => {
	const theme = useTheme();

	// @ts-ignore
	return <InkBox {...props} backgroundColor={theme.PRIMARY_BACKGROUND} />;
};

export default Box;
