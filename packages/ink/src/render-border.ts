import cliBoxes from 'cli-boxes';
import stringWidth from 'string-width';
import colorize from './colorize.js';
import {type DOMNode} from './dom.js';
import type Output from './output.js';

const applyBackground = (text: string, node: DOMNode) => {
	if (!node.style.backgroundColor) {
		return text;
	}

	return colorize(text, node.style.backgroundColor, 'background');
};

const renderBorder = (
	x: number,
	y: number,
	node: DOMNode,
	output: Output,
): void => {
	if (!node.style.borderStyle) {
		return;
	}

	const width = node.yogaNode!.getComputedWidth();
	const height = node.yogaNode!.getComputedHeight();

	const box =
		typeof node.style.borderStyle === 'string'
			? cliBoxes[node.style.borderStyle]
			: node.style.borderStyle;

	const topBorderColor = node.style.borderTopColor ?? node.style.borderColor;
	const bottomBorderColor =
		node.style.borderBottomColor ?? node.style.borderColor;
	const leftBorderColor = node.style.borderLeftColor ?? node.style.borderColor;
	const rightBorderColor =
		node.style.borderRightColor ?? node.style.borderColor;

	const showTopBorder = node.style.borderTop !== false;
	const showBottomBorder = node.style.borderBottom !== false;
	const showLeftBorder = node.style.borderLeft !== false;
	const showRightBorder = node.style.borderRight !== false;

	const contentWidth =
		width - (showLeftBorder ? 1 : 0) - (showRightBorder ? 1 : 0);

	let topBorderContent = box.top.repeat(contentWidth);

	if (showTopBorder && node.style.borderTitle) {
		const title = ` ${node.style.borderTitle} `;
		const titleWidth = stringWidth(title);

		if (titleWidth < contentWidth) {
			const alignment = node.style.borderTitleAlignment ?? 'left';
			let leftPadding = 0;

			if (alignment === 'center') {
				leftPadding = Math.floor((contentWidth - titleWidth) / 2);
			} else if (alignment === 'right') {
				leftPadding = contentWidth - titleWidth;
			}

			const left = box.top.repeat(leftPadding);
			const right = box.top.repeat(contentWidth - leftPadding - titleWidth);

			topBorderContent = left + title + right;
		}
	}

	if (showTopBorder) {
		let top = colorize(
			(showLeftBorder ? box.topLeft : '') +
				topBorderContent +
				(showRightBorder ? box.topRight : ''),
			topBorderColor,
			'foreground',
		);

		top = applyBackground(top, node);
		output.write(x, y, top, {transformers: []});
	}

	const verticalHeight =
		height - (showTopBorder ? 1 : 0) - (showBottomBorder ? 1 : 0);

	if (showLeftBorder) {
		let left = (
			colorize(box.left, leftBorderColor, 'foreground') + '\n'
		).repeat(verticalHeight);

		left = applyBackground(left, node);
		output.write(x, y + (showTopBorder ? 1 : 0), left, {
			transformers: [],
		});
	}

	if (showRightBorder) {
		let right = (
			colorize(box.right, rightBorderColor, 'foreground') + '\n'
		).repeat(verticalHeight);

		right = applyBackground(right, node);
		output.write(x + width - 1, y + (showTopBorder ? 1 : 0), right, {
			transformers: [],
		});
	}

	if (showBottomBorder) {
		let bottom = colorize(
			(showLeftBorder ? box.bottomLeft : '') +
				box.bottom.repeat(contentWidth) +
				(showRightBorder ? box.bottomRight : ''),
			bottomBorderColor,
			'foreground',
		);

		bottom = applyBackground(bottom, node);
		output.write(x, y + height - 1, bottom, {transformers: []});
	}
};

export default renderBorder;
