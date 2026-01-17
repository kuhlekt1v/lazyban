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
	isFocused: boolean;
};

const Column = ({title, cards, isFocused}: ColumnProps) => {
	const {stdout} = useStdout();
	const {focusState} = useFocus();
	const {HEADER_HEIGHT, FOOTER_HEIGHT, CARD_HEIGHT} = LAYOUT;

	const [bodyHeight, setBodyHeight] = useState(
		stdout.rows - HEADER_HEIGHT - FOOTER_HEIGHT,
	);

	const color = isFocused ? COLOR.PRIMARY : COLOR.SECONDARY;
	const columnCards = cards.filter(
		card => card.columnId === title.toLowerCase(),
	);
	const cardsPerColumn = Math.floor(bodyHeight / CARD_HEIGHT);
	const visibleCards = columnCards.slice(0, cardsPerColumn);

	const [firstVisibleCard, setFirstVisibleCard] = useState(0);
	const [lastVisibleCard, setLastVisibleCard] = useState(
		firstVisibleCard + cardsPerColumn,
	);

	const activeCardIndex =
		visibleCards.length === 0
			? -1
			: Math.min(focusState.activeCardIndex, visibleCards.length - 1);

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
			? `${firstVisibleCard + 1}-${lastVisibleCard} of ${columnCards.length}`
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
					isActive={index === activeCardIndex}
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
