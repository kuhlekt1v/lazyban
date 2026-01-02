import chalk from 'chalk';
import cliBoxes from 'cli-boxes';
import stringWidth from 'string-width';
import colorize from './colorize.js';
import {type DOMNode} from './dom.js';
import type Output from './output.js';

const renderBorder = (
	x: number,
	y: number,
	node: DOMNode,
	output: Output,
): void => {
	if (node.style.borderStyle) {
		const width = node.yogaNode!.getComputedWidth();
		const height = node.yogaNode!.getComputedHeight();
		const box =
			typeof node.style.borderStyle === 'string'
				? cliBoxes[node.style.borderStyle]
				: node.style.borderStyle;

		const topBorderColor = node.style.borderTopColor ?? node.style.borderColor;
		const bottomBorderColor =
			node.style.borderBottomColor ?? node.style.borderColor;
		const leftBorderColor =
			node.style.borderLeftColor ?? node.style.borderColor;
		const rightBorderColor =
			node.style.borderRightColor ?? node.style.borderColor;

		const dimTopBorderColor =
			node.style.borderTopDimColor ?? node.style.borderDimColor;

		const dimBottomBorderColor =
			node.style.borderBottomDimColor ?? node.style.borderDimColor;

		const dimLeftBorderColor =
			node.style.borderLeftDimColor ?? node.style.borderDimColor;

		const dimRightBorderColor =
			node.style.borderRightDimColor ?? node.style.borderDimColor;

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

				const leftBorderChars = box.top.repeat(leftPadding);
				const rightBorderChars = box.top.repeat(
					contentWidth - leftPadding - titleWidth,
				);

				topBorderContent = leftBorderChars + title + rightBorderChars;
			}
		}

		let topBorder = showTopBorder
			? colorize(
					(showLeftBorder ? box.topLeft : '') +
						topBorderContent +
						(showRightBorder ? box.topRight : ''),
					topBorderColor,
					'foreground',
				)
			: undefined;

		if (showTopBorder && dimTopBorderColor) {
			topBorder = chalk.dim(topBorder);
		}

		let verticalBorderHeight = height;

		if (showTopBorder) {
			verticalBorderHeight -= 1;
		}

		if (showBottomBorder) {
			verticalBorderHeight -= 1;
		}

		let leftBorder = (
			colorize(box.left, leftBorderColor, 'foreground') + '\n'
		).repeat(verticalBorderHeight);

		if (dimLeftBorderColor) {
			leftBorder = chalk.dim(leftBorder);
		}

		let rightBorder = (
			colorize(box.right, rightBorderColor, 'foreground') + '\n'
		).repeat(verticalBorderHeight);

		if (dimRightBorderColor) {
			rightBorder = chalk.dim(rightBorder);
		}

		let bottomBorder = showBottomBorder
			? colorize(
					(showLeftBorder ? box.bottomLeft : '') +
						box.bottom.repeat(contentWidth) +
						(showRightBorder ? box.bottomRight : ''),
					bottomBorderColor,
					'foreground',
				)
			: undefined;

		if (showBottomBorder && dimBottomBorderColor) {
			bottomBorder = chalk.dim(bottomBorder);
		}

		const offsetY = showTopBorder ? 1 : 0;

		if (topBorder) {
			output.write(x, y, topBorder, {transformers: []});
		}

		if (showLeftBorder) {
			output.write(x, y + offsetY, leftBorder, {transformers: []});
		}

		if (showRightBorder) {
			output.write(x + width - 1, y + offsetY, rightBorder, {
				transformers: [],
			});
		}

		if (bottomBorder) {
			output.write(x, y + height - 1, bottomBorder, {transformers: []});
		}
	}
};

export default renderBorder;
