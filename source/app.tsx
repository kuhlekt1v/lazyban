import React, {useState, useEffect} from 'react';
import {Text} from 'ink';
import {KanbanContext} from './core/KanbanContext.js';

import {Board as IBoard} from './core/models.js';
import Board from './components/Board.js';
import {CommandContext} from './context/CommandContext.js';

type Commands = {
	clear: () => void;
	exit: () => void;
};
type Props = {
	context: KanbanContext;
};

export default function App({context}: Props) {
	const [, setBoards] = useState<IBoard[]>([]);
	const [board, setBoard] = useState<IBoard | null>(null);
	const [status, setStatus] = useState<
		'loading' | 'create' | 'select' | 'show'
	>('loading');

	useEffect(() => {
		const loadBoards = async () => {
			const fetchedBoards = await context.getBoards();
			setBoards(fetchedBoards);

			if (fetchedBoards.length === 0) {
				setStatus('create');
			} else if (fetchedBoards.length === 1) {
				const b = await context.getBoard(fetchedBoards[0].id);
				setBoard(b);
				setStatus('show');
			} else {
				setStatus('select');
			}
		};
		loadBoards();
	}, [context]);

	if (status === 'loading') return <Text>Loading board...</Text>;
	if (status === 'create') return <Text>Prompt: Create a new board</Text>;
	if (status === 'select') return <Text>Prompt: Select a board</Text>;
	if (status === 'show' && board) return <Board board={board} />;

	return null;
}
