import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {Theme} from '../core/theme.js';
import {Instance as InkInstance} from 'ink';
import {Board} from '../core/models.js';
import {KanbanService} from '../core/KanbanService.js';

type AppContextValue = InkInstance & {
	theme: Theme;
	board: Board;
	setBoard: (board: Board) => void;
	status: 'loading' | 'show' | 'error';
	kanbanService: KanbanService;
	cardsPerColumn: number[];
};

type ProviderProps = {
	context: InkInstance & {
		theme: Theme;
		boardId?: string;
		kanbanService: KanbanService;
	};
	children: ReactNode;
};

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider = ({context, children}: ProviderProps) => {
	const [board, setBoard] = useState<Board | undefined>(undefined);
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

	if (status === 'loading') {
		return <>{/* Render loading UI here */}</>;
	}
	if (status === 'error' || !board) {
		return <>{/* Render error UI here */}</>;
	}

	const cardsPerColumn = board
		? board.columns.map(
				column =>
					board.cards.filter(
						card => card.columnId === column.name.toLowerCase(),
					).length,
		  )
		: [];

	const value: AppContextValue = {
		...context,
		theme: context.theme,
		board,
		setBoard,
		status,
		kanbanService: context.kanbanService,
		cardsPerColumn,
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
