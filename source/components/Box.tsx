import React from 'react';
import {BoxProps, Box as InkBox} from 'ink';

/* Box resolves known error. Ink's Element type is not
 * assignabled to React.ReactNode, but safe in Ink CLI.
 */

const Box = (props: BoxProps): Element => {
	// @ts-ignore
	return <InkBox {...props} />;
};

export default Box;
