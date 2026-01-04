import React from 'react';
import {Newline, Text, useStdout} from 'ink';
import {COLOR} from '../constants.js';
import {Card as ICard} from '../core/models.js';
import Box from './Box.js';

type CardProps = {
	card: ICard;
	height: number;
};

const PADDING_X = 1;

const Card = ({card, height}: CardProps) => {
	const priorityMap: Record<string, {color: string; value: string}> = {
		low: {color: COLOR.YELLOW, value: '[!  ]  '},
		medium: {color: COLOR.ORANGE, value: '[!! ]  '},
		high: {color: COLOR.RED, value: '[!!!]  '},
	};

	return (
		<Box
			display="flex"
			paddingX={PADDING_X}
			paddingY={0}
			flexDirection="column"
			justifyContent="space-between"
			borderStyle="single"
			borderColor={COLOR.SECONDARY}
			height={height}
		>
			<Text>
				{card.id}: {card.title}
			</Text>
			<Text backgroundColor={COLOR.HIGHLIGHT} color="black">
				{card.feature}
			</Text>
			<Text wrap="truncate">{card.description}</Text>
			<Text>
				<Text color={priorityMap[card.priority]?.color ?? undefined}>
					{priorityMap[card.priority]?.value ?? '[   ]  '}
				</Text>
				<Text>{card.points ?? '-'}</Text>
			</Text>
		</Box>
	);
};

export default Card;
