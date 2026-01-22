import React, {useState, useEffect} from 'react';
import {Text, useStdout} from 'ink';
import {COLOR, LAYOUT} from '../constants.js';
import Card from './Card.js';
import {Card as ICard} from '../core/models.js';
import Box from './Box.js';
import {useFocus} from '../context/FocusContext.js';

type ColumnProps = {
	title: string;
	cards: ICard[];
	columnIndex: number;
	isFocused: boolean;
};

const Column = ({title, cards, columnIndex, isFocused}: ColumnProps) => {
	const {stdout} = useStdout();
	const {focusState, cardsPerColumn} = useFocus();
	const {HEADER_HEIGHT, FOOTER_HEIGHT, CARD_HEIGHT} = LAYOUT;

	const [bodyHeight, setBodyHeight] = useState(
		stdout.rows - HEADER_HEIGHT - FOOTER_HEIGHT,
	);

	const activeCardIndex = focusState.active.cardIndex;
	const visibleCardsPerColumn = Math.floor(bodyHeight / CARD_HEIGHT);
	const startIndex = isFocused
		? Math.floor(activeCardIndex / visibleCardsPerColumn) *
		  visibleCardsPerColumn
		: 0;

	const visibleCards = cards.slice(
		startIndex,
		startIndex + visibleCardsPerColumn,
	);

	const color = isFocused ? COLOR.PRIMARY : COLOR.SECONDARY;

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

	const totalCards = cardsPerColumn[columnIndex] ?? 0;

	const firstVisible = isFocused ? focusState.active.cardIndex + 1 : 1;

	const lastVisible = Math.min(
		startIndex + visibleCardsPerColumn,
		cards.length,
	);

	const footerText =
		cards.length > 0
			? isFocused
				? `${firstVisible}-${lastVisible} of ${totalCards}`
				: `1-${Math.min(visibleCardsPerColumn, cards.length)} of ${totalCards}`
			: '';

	return (
		<Box
			borderStyle="round"
			borderColor={color}
			flexDirection="column"
			justifyContent="flex-start"
			width={100}
		>
			{/* Header */}
			<Box height={HEADER_HEIGHT} justifyContent="center" alignItems="center">
				<Text color={color}>{title}</Text>
			</Box>
			{/* Kanban cards */}
			{visibleCards.map((card, index) => (
				<Card
					key={card.id}
					card={card}
					height={CARD_HEIGHT}
					isActive={
						isFocused &&
						index + startIndex === focusState.active.cardIndex &&
						columnIndex === focusState.active.columnIndex
					}
				/>
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
