import colorize from './colorize.js';
import {type DOMNode} from './dom.js';
import type Output from './output.js';

const renderBackground = (
	x: number,
	y: number,
	node: DOMNode,
	output: Output,
): void => {
	if (!node.style.backgroundColor) {
		return;
	}

	const width = node.yogaNode!.getComputedWidth();
	const height = node.yogaNode!.getComputedHeight();

	if (width <= 0 || height <= 0) {
		return;
	}

	const backgroundLine = colorize(
		' '.repeat(width),
		node.style.backgroundColor,
		'background',
	);

	for (let row = 0; row < height; row++) {
		output.write(x, y + row, backgroundLine, {transformers: []});
	}
};

export default renderBackground;
