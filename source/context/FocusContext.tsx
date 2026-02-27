import {ReactNode, useContext, useReducer, createContext} from 'react';
import {LAYOUT} from '../constants.js';
import {FOCUS_ACTION} from './focusActions.js';
import {useApp} from './AppContext.js';
import {Board, ID} from '../core/models.js';

export const OVERLAY_TYPE = {
	DETAIL: 'DETAIL',
	HELP: 'HELP',
} as const;

type Action =
	| {
			type: typeof FOCUS_ACTION.NEXT_COL;
			payload: {cardsInCol: number | undefined};
	  }
	| {
			type: typeof FOCUS_ACTION.PREV_COL;
			payload: {cardsInCol: number | undefined};
	  }
	| {
			type: typeof FOCUS_ACTION.NEXT_CARD;
			payload: {cardsInCol: number | undefined};
	  }
	| {
			type: typeof FOCUS_ACTION.PREV_CARD;
			payload: {cardsInCol: number | undefined};
	  }
	| {
			type: typeof FOCUS_ACTION.EXPAND_CARD;
			payload: {cardId: ID};
	  }
	| {
			type: typeof FOCUS_ACTION.CLOSE_OVERLAY;
			payload: {overlay: keyof typeof OVERLAY_TYPE};
	  }
	| {
			type: typeof FOCUS_ACTION.SHOW_QUIT_PROMPT;
	  }
	| {
			type: typeof FOCUS_ACTION.HIDE_QUIT_PROMPT;
	  };

export interface FocusState {
	active: {
		cardId: ID | undefined;
		columnIndex: number;
		cardIndex: number | undefined;
	};
	cardDetailOpen: boolean;
	helpMenuOpen: boolean;
	quitPromptOpen: boolean;
}

interface FocusContextValue {
	focusState: FocusState;
	cardsPerColumn: number[];
	nextColumn: () => void;
	prevColumn: () => void;
	nextCard: () => void;
	prevCard: () => void;
	expandCard: (cardId: Board) => void;
	closeOverlay: (type: keyof typeof OVERLAY_TYPE) => void;
	showQuitPrompt: () => void;
	hideQuitPrompt: () => void;
}

const initialState: FocusState = {
	active: {columnIndex: 0, cardIndex: 0, cardId: undefined},
	cardDetailOpen: false,
	helpMenuOpen: false,
	quitPromptOpen: false,
};
function wrap(index: number, count: number) {
	if (count <= 0) return 0;
	return (index + count) % count;
}

const reducer = (state: FocusState, action: Action): FocusState => {
	switch (action.type) {
		case FOCUS_ACTION.NEXT_COL: {
			const cardsInCol = action.payload.cardsInCol ?? 0;
			return {
				...state,
				active: {
					...state.active,
					columnIndex: wrap(state.active.columnIndex + 1, LAYOUT.TOTAL_COLUMN),
					cardIndex: cardsInCol > 0 ? 0 : undefined,
				},
			};
		}
		case FOCUS_ACTION.PREV_COL: {
			const cardsInCol = action.payload.cardsInCol ?? 0;
			return {
				...state,
				active: {
					...state.active,
					columnIndex: wrap(state.active.columnIndex - 1, LAYOUT.TOTAL_COLUMN),
					cardIndex: cardsInCol > 0 ? 0 : undefined,
				},
			};
		}
		case FOCUS_ACTION.PREV_CARD: {
			const cardsInCol = action.payload.cardsInCol ?? 0;

			if (cardsInCol === 0) return state;
			return {
				...state,
				active: {
					...state.active,
					cardIndex: (state.active.cardIndex! - 1 + cardsInCol) % cardsInCol,
				},
			};
		}
		case FOCUS_ACTION.NEXT_CARD: {
			const cardsInCol = action.payload.cardsInCol ?? 0;

			if (cardsInCol === 0) return state;
			return {
				...state,
				active: {
					...state.active,
					cardIndex: (state.active.cardIndex! + 1) % cardsInCol,
				},
			};
		}
		case FOCUS_ACTION.EXPAND_CARD: {
			return {
				...state,
				active: {
					...state.active,
					cardId: action.payload.cardId,
				},
				cardDetailOpen: true,
			};
		}

		case FOCUS_ACTION.CLOSE_OVERLAY: {
			const {overlay} = action.payload;
			if (overlay === 'DETAIL') {
				return {...state, cardDetailOpen: false};
			}
			if (overlay === 'HELP') {
				return {...state, helpMenuOpen: false};
			}
			return state;
		}

		case FOCUS_ACTION.SHOW_QUIT_PROMPT: {
			return {...state, quitPromptOpen: true};
		}

		case FOCUS_ACTION.HIDE_QUIT_PROMPT: {
			return {...state, quitPromptOpen: false};
		}

		default:
			return state;
	}
};

const FocusContext = createContext<FocusContextValue>({
	focusState: initialState,
	cardsPerColumn: [],
	nextColumn: () => {},
	prevColumn: () => {},
	nextCard: () => {},
	prevCard: () => {},
	expandCard: () => {},
	closeOverlay: (_type: keyof typeof OVERLAY_TYPE) => {},
	showQuitPrompt: () => {},
	hideQuitPrompt: () => {},
});

export const FocusProvider = ({children}: {children: ReactNode}) => {
	const {cardsPerColumn} = useApp();
	const [focusState, dispatch] = useReducer(reducer, initialState);

	const nextColumn = () => {
		const nextCol = wrap(
			focusState.active.columnIndex + 1,
			LAYOUT.TOTAL_COLUMN,
		);
		dispatch({
			type: FOCUS_ACTION.NEXT_COL,
			payload: {cardsInCol: cardsPerColumn[nextCol]},
		});
	};

	const prevColumn = () => {
		const prevCol = wrap(
			focusState.active.columnIndex - 1,
			LAYOUT.TOTAL_COLUMN,
		);
		dispatch({
			type: FOCUS_ACTION.PREV_COL,
			payload: {cardsInCol: cardsPerColumn[prevCol]},
		});
	};

	const nextCard = () =>
		dispatch({
			type: FOCUS_ACTION.NEXT_CARD,
			payload: {cardsInCol: cardsPerColumn[focusState.active.columnIndex]},
		});

	const prevCard = () =>
		dispatch({
			type: FOCUS_ACTION.PREV_CARD,
			payload: {cardsInCol: cardsPerColumn[focusState.active.columnIndex]},
		});

	const expandCard = (board: Board) => {
		const column = board.columns[focusState.active.columnIndex];
		if (!column) return;
		const cardsInColumn = board.cards.filter(
			card => card.columnId === column.id,
		);
		const card = cardsInColumn[focusState.active.cardIndex ?? 0];
		if (card?.id) {
			dispatch({
				type: FOCUS_ACTION.EXPAND_CARD,
				payload: {cardId: card.id},
			});
		}
	};

	const closeOverlay = (type: keyof typeof OVERLAY_TYPE) =>
		dispatch({
			type: FOCUS_ACTION.CLOSE_OVERLAY,
			payload: {overlay: type},
		});

	const showQuitPrompt = () =>
		dispatch({
			type: FOCUS_ACTION.SHOW_QUIT_PROMPT,
		});

	const hideQuitPrompt = () =>
		dispatch({
			type: FOCUS_ACTION.HIDE_QUIT_PROMPT,
		});

	return (
		// @ts-ignore
		<FocusContext.Provider
			value={{
				focusState,
				cardsPerColumn,
				nextColumn,
				prevColumn,
				nextCard,
				prevCard,
				expandCard,
				closeOverlay,
				showQuitPrompt,
				hideQuitPrompt,
			}}
		>
			{children}
		</FocusContext.Provider>
	);
};

export const useFocus = () => {
	const ctx = useContext(FocusContext);
	if (!ctx) throw new Error('useFocus must used within FocusProvider');
	return ctx;
};
