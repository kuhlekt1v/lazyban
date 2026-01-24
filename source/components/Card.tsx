import React from 'react';
import {Newline, Text} from 'ink';
import {COLOR} from '../constants.js';
import {Card as ICard} from '../core/models.js';
import Box from './Box.js';

type CardProps = {
	card: ICard;
	isActive: boolean;
};

const displayText = (
	text: string | null | undefined,
	replacement: Element = <Text>&nbsp;</Text>,
) => <Text>{text || replacement}</Text>;

const priorityMap: Record<string, {color: string; value: string}> = {
	low: {color: COLOR.YELLOW, value: '[!  ]  '},
	medium: {color: COLOR.ORANGE, value: '[!! ]  '},
	high: {color: COLOR.RED, value: '[!!!]  '},
};

const Card = ({card, isActive}: CardProps) => {
	const priority = card.priority && priorityMap[card.priority];

	return (
		<Box
			display="flex"
			paddingX={1}
			paddingY={0}
			flexDirection="column"
			justifyContent="flex-start"
			borderStyle="single"
			borderColor={isActive ? COLOR.PRIMARY : COLOR.SECONDARY}
			width="100%"
			minHeight={6}
		>
			<Text wrap="truncate">{displayText(`${card.id}: ${card.title}`)}</Text>
			<Text backgroundColor={COLOR.HIGHLIGHT} color="black">
				{displayText(card.feature)}
			</Text>
			<Text wrap="truncate">{displayText(card.description)}</Text>
			<Text>
				<Text color={priority?.color}>
					{displayText(priority?.value, '[   ]  ')}
				</Text>
				<Text>{displayText(card.points as unknown as string, '-')}</Text>
			</Text>
		</Box>
	);
};

export default Card;
