import React, {ReactNode, useContext, useReducer, createContext} from 'react';
import {LAYOUT} from '../constants.js';
import {useDebug} from './DebugContext.js';

export const FOCUS_ACTION = {
	NEXT_COL: 'NEXT_COL',
	PREV_COL: 'PREV_COL',
	NEXT_CARD: 'NEXT_CARD',
	PREV_CARD: 'PREV_CARD',
	QUIT: 'QUIT',
	KEYBINDINGS: 'KEYBINDINGS',
} as const;

type Action =
	| {type: typeof FOCUS_ACTION.NEXT_COL}
	| {type: typeof FOCUS_ACTION.PREV_COL};

export interface FocusState {
	activeColumnIndex: number;
	activeCardIndex: number;
	// indexPostion = column index; number = cardsPerColumn.
	cardsPerColumn: number[];
}

interface FocusContextValue {
	focusState: FocusState;
	nextColumn: () => void;
}

const initialState: FocusState = {
	activeColumnIndex: 0,
	activeCardIndex: 0,
	cardsPerColumn: [],
};
function wrap(index: number, count: number) {
	if (count <= 0) return 0;
	return (index + count) % count;
}

const reducer = (state: FocusState, action: Action): FocusState => {
	switch (action.type) {
		case FOCUS_ACTION.NEXT_COL: {
			return {
				...state,
				activeColumnIndex: wrap(
					state.activeColumnIndex + 1,
					LAYOUT.TOTAL_COLUMN,
				),
			};
		}
		// case PREV_COL: {}
		// case NEXT_CARD: {}
		// case PREV_CARD: {}
		default:
			return state;
	}
};

const FocusContext = createContext<FocusContextValue>({
	focusState: initialState,
	nextColumn: () => {},
});

export const FocusProvider = ({children}: {children: ReactNode}) => {
	const [focusState, dispatch] = useReducer(reducer, initialState);

	const nextColumn = () => dispatch({type: FOCUS_ACTION.NEXT_COL});

	return (
		// @ts-ignore
		<FocusContext.Provider value={{focusState, nextColumn}}>
			{children}
		</FocusContext.Provider>
	);
};

export const useFocus = () => {
	const ctx = useContext(FocusContext);
	if (!ctx) throw new Error('useFocus must used within FocusProvider');
	return ctx;
};
