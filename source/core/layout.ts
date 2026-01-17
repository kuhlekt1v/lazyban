/**
 * Calculates the number of cards that can be displayed in a single column
 * and determines which cards are visible based on the available height.
 *
 * @template T The type of the items in the cards array.
 * @param cards The array of cards to be displayed.
 * @param bodyHeight The total height of the container area for the cards.
 * @param cardHeight The height of a single card.
 * @returns An object containing the number of cards per column and the array of visible cards.
 */
export function calculateVisibleCards<T>(
	cards: T[],
	bodyHeight: number,
	cardHeight: number,
) {
	const cardsPerColumn = Math.floor(bodyHeight / cardHeight);

	return {
		cardsPerColumn,
		visibleCards: cards.slice(0, cardsPerColumn),
	};
}
