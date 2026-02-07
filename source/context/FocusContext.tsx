import React, {
	ReactNode,
	useContext,
	useReducer,
	createContext,
	useState,
} from 'react';
import {LAYOUT} from '../constants.js';
import {FOCUS_ACTION} from './focusActions.js';

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
			payload: {cardsInCol: number | undefined};
	  }
	| {
			type: typeof FOCUS_ACTION.CLOSE_OVERLAY;
			payload: {overlay: keyof typeof OVERLAY_TYPE};
	  };

export interface FocusState {
	active: {
		columnIndex: number;
		cardIndex: number | undefined;
	};
	cardDetailOpen: boolean;
	helpMenuOpen: boolean;
}

interface FocusContextValue {
	focusState: FocusState;
	cardsPerColumn: number[];
	nextColumn: () => void;
	prevColumn: () => void;
	nextCard: () => void;
	prevCard: () => void;
	expandCard: () => void;
	setCardsPerColumn: (cards: number[]) => void;
	closeOverlay: (type: keyof typeof OVERLAY_TYPE) => void;
}

const initialState: FocusState = {
	active: {columnIndex: 0, cardIndex: 0},
	cardDetailOpen: false,
	helpMenuOpen: false,
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
			const cardsInCol = action.payload.cardsInCol ?? 0;

			if (cardsInCol === 0) return state;
			return {
				...state,
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

		default:
			return state;
	}
};

const FocusContext = createContext<FocusContextValue>({
	focusState: initialState,
	cardsPerColumn: [],
	setCardsPerColumn: (_cards: number[]) => {},
	nextColumn: () => {},
	prevColumn: () => {},
	nextCard: () => {},
	prevCard: () => {},
	expandCard: () => {},
	closeOverlay: (_type: keyof typeof OVERLAY_TYPE) => {},
});

export const FocusProvider = ({children}: {children: ReactNode}) => {
	const [focusState, dispatch] = useReducer(reducer, initialState);
	const [cardsPerColumn, setCardsPerColumn] = useState([]);

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
	const expandCard = () =>
		dispatch({
			type: FOCUS_ACTION.EXPAND_CARD,

			payload: {cardsInCol: cardsPerColumn[focusState.active.columnIndex]},
		});

	const closeOverlay = (type: keyof typeof OVERLAY_TYPE) =>
		dispatch({
			type: FOCUS_ACTION.CLOSE_OVERLAY,
			payload: {overlay: type},
		});

	return (
		// @ts-ignore
		<FocusContext.Provider
			value={{
				focusState,
				cardsPerColumn,
				setCardsPerColumn,
				nextColumn,
				prevColumn,
				nextCard,
				prevCard,
				expandCard,
				closeOverlay,
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
