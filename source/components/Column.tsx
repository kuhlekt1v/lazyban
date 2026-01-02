import React, {useState, useEffect} from 'react';
import {Text, useStdout} from 'ink';
import {COLOR} from '../constants.js';
import Card from './Card.js';
import {Card as ICard} from '../core/models.js';
import Box from './Box.js';

type ColumnProps = {
	title: string;
	cards: ICard[];
	isFocused: boolean;
	offset: number;
};

const CARD_HEIGHT = 8;
const HEADER_HEIGHT = 1;
const FOOTER_HEIGHT = 2;

const Column = ({title, cards, isFocused, offset}: ColumnProps) => {
	const {stdout} = useStdout();
	const [bodyHeight, setBodyHeight] = useState(
		stdout.rows - HEADER_HEIGHT - FOOTER_HEIGHT,
	);
	const color = isFocused ? COLOR.PRIMARY : COLOR.SECONDARY;

	const columnCards = cards.filter(
		card => card.columnId === title.toLowerCase(),
	);
	const cardsPerColumn = Math.floor(bodyHeight / CARD_HEIGHT);
	const visibleCards = columnCards.slice(0, cardsPerColumn);

	/* Dynamically resize column body if terminal
	 * manually resized (e.g. user click & drag).
	 */
	useEffect(() => {
		const handleResize = () => {
			setBodyHeight(stdout.rows - HEADER_HEIGHT - FOOTER_HEIGHT);
		};

		stdout.on('resize', handleResize);

		return () => {
			stdout.off('resize', handleResize);
		};
	}, [stdout]);

	const footerText =
		columnCards.length > 0
			? `${visibleCards.length} / ${columnCards.length}`
			: '';

	return (
		<Box
			borderStyle="round"
			borderColor={color}
			flexDirection="column"
			justifyContent="space-between"
			width={100}
		>
			{/* Header */}
			<Box height={HEADER_HEIGHT} justifyContent="center" alignItems="center">
				<Text color={color}>{title}</Text>
			</Box>

			{visibleCards.map(card => (
				<Card key={card.id} card={card} height={CARD_HEIGHT} />
			))}

			{/* Footer */}
			<Box justifyContent="center" height={FOOTER_HEIGHT}>
				<Text color={COLOR.SECONDARY_DIM} dimColor>
					{footerText}
				</Text>
			</Box>
		</Box>
	);
};

export default Column;
