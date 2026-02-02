import React, {useState, useEffect} from 'react';
import {Text, useInput} from 'ink';
import {KanbanContext} from './core/KanbanContext.js';

import {Board as IBoard} from './core/models.js';
import Board from './components/Board.js';
import Box from './components/Box.js';
import Overlay from './components/Overlay.js';
import {useTheme} from './context/AppEnvContext.js';

type Props = {
	context: KanbanContext;
};

export default function App({context}: Props) {
	const theme = useTheme();
	const [, setBoards] = useState<IBoard[]>([]);
	const [board, setBoard] = useState<IBoard | null>(null);
	const [status, setStatus] = useState<
		'loading' | 'create' | 'select' | 'show'
	>('loading');

	const [isOverlayOpen, setIsOverlayOpen] = useState(false);

	const handleCloseModal = () => {
		setIsOverlayOpen(false);
	};

	useInput(
		input => {
			if (input === '?') {
				setIsOverlayOpen(true);
			}
		},
		{isActive: !isOverlayOpen},
	);

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
	if (status === 'show' && board) {
		return (
			<Box
				width="100%"
				height="100%"
				backgroundColor={theme.PRIMARY_BACKGROUND}
			>
				<Board board={board} />
				{isOverlayOpen && <Overlay onClose={handleCloseModal} />}
			</Box>
		);
	}

	return null;
}
