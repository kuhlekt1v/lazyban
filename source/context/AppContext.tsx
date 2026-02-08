import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {Theme} from '../core/theme.js';
import {Instance as InkInstance} from 'ink';
import {Board} from '../core/models.js';
import {KanbanService} from '../core/KanbanService.js';

type AppContextValue = InkInstance & {
	theme: Theme;
	board: Board | null;
	setBoard: (board: Board | null) => void;
	status: 'loading' | 'show' | 'error';
	kanbanService: KanbanService;
};

type ProviderProps = {
	context: {
		env: InkInstance;
		theme: Theme;
		boardId?: string;
		kanbanService: KanbanService;
	};
	children: ReactNode;
};

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider = ({context, children}: ProviderProps) => {
	const [board, setBoard] = useState<Board | null>(null);
	const [status, setStatus] = useState<'loading' | 'show' | 'error'>('loading');

	useEffect(() => {
		/* TODO: Support multiple boards and selection flow
		 * TODO: Replace hardcoded 'board-1' with proper board
		 *       initialization/selection flow after development
		 */
		const loadBoard = async () => {
			try {
				const b = await context.kanbanService.getBoard(
					context.boardId ?? 'board-1',
				);
				setBoard(b);
				setStatus('show');
			} catch (e) {
				setStatus('error');
			}
		};
		loadBoard();
	}, [context.kanbanService, context.boardId]);

	const value: AppContextValue = {
		...context.env,
		theme: context.theme,
		board,
		setBoard,
		status,
		kanbanService: context.kanbanService,
	};

	return (
		//@ts-ignore
		<AppContext.Provider value={value}>{children}</AppContext.Provider>
	);
};

export const useApp = (): AppContextValue => {
	const ctx = useContext(AppContext);
	if (!ctx) {
		throw new Error('useApp must be used within AppProvider');
	}
	return ctx;
};

export const useTheme = () => useApp().theme;
