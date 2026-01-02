import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useReducer,
	type ReactNode,
} from 'react';
import type {AppEnv, ID} from '../core/models.js';

export type CommandAction =
	| {type: 'QUIT'}
	| {type: 'SHOW_KEYBINDINGS'}
	| {type: 'PREV_COLUMN'}
	| {type: 'NEXT_COLUMN'};

export type Command = {
	id: ID;
	title: string;
	input: string[];
	description: string;
	action: CommandAction;
	display: boolean;
};

export type CommandContextValue = {
	commands: Command[];
	dispatch: React.Dispatch<CommandAction>;
};

type CommandProviderProps = {
	env: AppEnv;
	children: Element;
};

type AppState = {
	quitting: boolean;
};

const initialCommands: Command[] = [
	{
		id: '1',
		title: 'Quit',
		input: ['q'],
		description: 'Clear terminal and quit application.',
		action: {type: 'QUIT'},
		display: true,
	},
	{
		id: '2',
		title: 'Keybindings',
		input: ['?'],
		description: '',
		action: {type: 'SHOW_KEYBINDINGS'},
		display: true,
	},
	{
		id: '3',
		title: 'Prev. Column',
		input: ['h', 'leftArrow'],
		description: 'Move focus to previous column.',
		action: {type: 'PREV_COLUMN'},
		display: false,
	},
	{
		id: '4',
		title: 'Next. Column',
		input: ['l', 'rightArrow'],
		description: 'Move focus to next column.',
		action: {type: 'NEXT_COLUMN'},
		display: false,
	},
];

const initialState: AppState = {
	quitting: false,
};

function commandReducer(state: AppState, action: CommandAction): AppState {
	switch (action.type) {
		case 'QUIT':
			return {...state, quitting: true};
		case 'SHOW_KEYBINDINGS':
		case 'PREV_COLUMN':
		case 'NEXT_COLUMN':
			return state;
		default:
			return state;
	}
}

const CommandContext = createContext<CommandContextValue | null>(null);

export function CommandProvider({env, children}: CommandProviderProps) {
	const [state, dispatch] = useReducer(commandReducer, initialState);
	const commands = useMemo(() => initialCommands, []);

	useEffect(() => {
		if (state.quitting) {
			env.clear();
			env.unmount();
		}
	}, [state.quitting, env]);

	return (
		<CommandContext.Provider value={{commands, dispatch}}>
			{children}
		</CommandContext.Provider>
	);
}

export function useCommands() {
	const ctx = useContext(CommandContext);
	if (!ctx) {
		throw new Error('useCommands must be used within a CommandProvider');
	}
	return ctx;
}
