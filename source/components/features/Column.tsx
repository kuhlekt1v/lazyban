import React, {useState, useEffect} from 'react';
import {Text, useStdout} from 'ink';
import {LAYOUT} from '../../constants.js';
import Card from './Card.js';
import {Card as ICard} from '../../core/models.js';
import {Box} from '../shared/index.js';
import {useFocus} from '../../context/FocusContext.js';
import {useTheme} from '../../context/AppContext.js';

type ColumnProps = {
	title: string;
	cards: ICard[];
	columnIndex: number;
	isFocused: boolean;
};

const Column = ({title, cards, columnIndex, isFocused}: ColumnProps) => {
	const theme = useTheme();
	const {stdout} = useStdout();
	const {focusState, cardsPerColumn} = useFocus();
	const {HEADER_HEIGHT, FOOTER_HEIGHT, CARD_HEIGHT} = LAYOUT;

	const [bodyHeight, setBodyHeight] = useState(
		stdout.rows - HEADER_HEIGHT - FOOTER_HEIGHT,
	);

	const activeCardIndex = focusState.active.cardIndex;
	const visibleCardsPerColumn = Math.floor(bodyHeight / CARD_HEIGHT);
	const startIndex = isFocused
		? Math.floor(activeCardIndex! / visibleCardsPerColumn) *
		  visibleCardsPerColumn
		: 0;

	const visibleCards = cards.slice(
		startIndex,
		startIndex + visibleCardsPerColumn,
	);

	const color = isFocused ? theme.PRIMARY : theme.SECONDARY;

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

	const firstVisible = isFocused ? focusState.active.cardIndex! + 1 : 1;

	const lastVisible = Math.min(
		startIndex + visibleCardsPerColumn,
		cards.length,
	);

	let footerText: string;
	if (cards.length === 0) {
		footerText = '0-0 of 0';
	} else if (isFocused) {
		footerText = `${firstVisible}-${lastVisible} of ${totalCards}`;
	} else {
		footerText = `1-${Math.min(
			visibleCardsPerColumn,
			cards.length,
		)} of ${totalCards}`;
	}

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
			{/* Kanban cards */}
			<Box flexDirection="column" flexGrow={1} paddingTop={0} paddingBottom={0}>
				{visibleCards.map((card, index) => (
					<Card
						key={card.id}
						card={card}
						isActive={
							isFocused &&
							index + startIndex === focusState.active.cardIndex &&
							columnIndex === focusState.active.columnIndex
						}
					/>
				))}
			</Box>

			{/* Footer */}
			<Box justifyContent="center" height={FOOTER_HEIGHT}>
				<Text color={theme.SECONDARY_DIM} dimColor>
					{footerText}
				</Text>
			</Box>
		</Box>
	);
};

export default Column;
