import React from 'react';
import {Box, Text} from 'ink';
import {COLOR} from '../constants.js';
import {Card as ICard} from '../core/models.js';

type CardProps = {
	card: ICard;
	height?: number;
};
const Card = ({card, height}: CardProps) => {
	const rows = height ?? 6;

	return (
		<Box borderStyle="single" borderColor={COLOR.SECONDARY} height={rows}>
			<Text>{card.title}</Text>
		</Box>
	);
};

export default Card;
