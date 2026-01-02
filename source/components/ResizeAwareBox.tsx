import React from 'react';
import {Box, useStdout} from 'ink';
import {
	useEffect,
	useRef,
	useState,
	type ReactNode,
	type ComponentProps,
} from 'react';
import ansiEscapes from 'ansi-escapes';

type BoxProps = ComponentProps<typeof Box>;

type ResizeAwareBoxProps = Omit<BoxProps, 'width' | 'height'> & {
	children: ReactNode | ((dims: {height: number; width: number}) => ReactNode);
	/**
	 * Number of rows to reserve at the bottom (prevents terminal scrolling issues)
	 * @default 1
	 */
	marginBottom?: number;
	/**
	 * Number of columns to reserve on the right
	 * @default 0
	 */
	marginRight?: number;
	/**
	 * Use full terminal width
	 * @default true
	 */
	fullWidth?: boolean;
	/**
	 * Use full terminal height (minus marginBottom)
	 * @default true
	 */
	fullHeight?: boolean;
	/**
	 * Custom width (overrides fullWidth)
	 */
	width?: number | string;
	/**
	 * Custom height (overrides fullHeight)
	 */
	height?: number | string;
};

export function ResizeAwareBox({
	children,
	marginBottom = 1,
	marginRight = 0,
	fullWidth = true,
	fullHeight = true,
	width: customWidth,
	height: customHeight,
	...boxProps
}: ResizeAwareBoxProps) {
	const {stdout} = useStdout();
	const [dimensions, setDimensions] = useState({
		width: stdout.columns,
		height: stdout.rows,
	});
	const prevDimensions = useRef(dimensions);

	useEffect(() => {
		const handleResize = () => {
			const currW = stdout.columns;
			const currH = stdout.rows;
			const {width: prevW, height: prevH} = prevDimensions.current;

			// Clear on shrink to prevent artifacts
			if (currW < prevW || currH < prevH) {
				stdout.write(ansiEscapes.clearTerminal);
			}

			const newDimensions = {width: currW, height: currH};
			prevDimensions.current = newDimensions;
			setDimensions(newDimensions);
		};

		stdout.on('resize', handleResize);
		return () => stdout.off('resize', handleResize);
	}, [stdout]);

	const computedWidth =
		customWidth ?? (fullWidth ? dimensions.width - marginRight : undefined);
	const computedHeight =
		customHeight ?? (fullHeight ? dimensions.height - marginBottom : undefined);

	return (
		<Box
			{...boxProps}
			width={typeof computedWidth === 'number' ? computedWidth : 0}
			height={typeof computedHeight === 'number' ? computedHeight : 0}
		>
			{typeof children === 'function'
				? children({
						height: computedHeight as number,
						width: computedWidth as number,
				  })
				: children}
		</Box>
	);
}
