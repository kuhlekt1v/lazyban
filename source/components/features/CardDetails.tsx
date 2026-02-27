import {ReactNode} from 'react';
import {Text} from 'ink';
import {useApp, useTheme} from '../../context/AppContext.js';
import {useFocus} from '../../context/FocusContext.js';
import {Card, Comment, Priority as PriorityType} from '../../core/models.js';
import Box from '../shared/Box.js';
import Priority from '../shared/Priority.js';

type CardViewProps = {
	card: Card;
	boardName: string;
};

type DetailProps = {
	label: string;
	value: ReactNode;
	rightAlign?: boolean;
};

const Detail = ({label, value, rightAlign}: DetailProps) => {
	return (
		<Box
			width="100%"
			flexDirection="row"
			justifyContent={rightAlign ? 'flex-end' : undefined}
		>
			<Text bold>{label}:&nbsp;</Text>
			<Text>{value != null ? value : '-'}</Text>
		</Box>
	);
};

const PriorityLabel = ({priority}: {priority?: PriorityType}) => {
	const priorityLabel = priority
		? priority.replace(/^./, (char: string) => char.toUpperCase())
		: '';
	return priorityLabel ? (
		<>
			{priorityLabel}&nbsp;
			<Priority priority={priority} />
		</>
	) : (
		<>-</>
	);
};

const formatRelativeTime = (dateString: string): string => {
	const now = new Date();
	const date = new Date(dateString);
	const diffMs = now.getTime() - date.getTime();

	if (diffMs < 0) {
		return 'upcoming';
	}

	const diffMinutes = Math.floor(diffMs / 60_000);
	const diffHours = Math.floor(diffMs / 3_600_000);
	const diffDays = Math.floor(diffMs / 86_400_000);

	if (diffMinutes < 1) {
		return 'just now';
	}

	if (diffMinutes < 60) {
		return `${diffMinutes}m ago`;
	}

	if (diffHours < 24) {
		return `${diffHours}h ago`;
	}

	return `${diffDays}d ago`;
};

const CommentRow = ({comment}: {comment: Comment}) => {
	const theme = useTheme();
	return (
		<Box width="100%" flexDirection="row" justifyContent="space-between">
			<Text>
				<Text color={theme.PRIMARY}>@{comment.author}</Text>: {comment.text}
			</Text>
			<Text dimColor>{formatRelativeTime(comment.createdAt)}</Text>
		</Box>
	);
};

const CardView = ({boardName, card}: CardViewProps) => {
	const comments = card.comments ?? [];

	return (
		<Box width="100%" flexDirection="column" marginX={1}>
			{/* Header */}
			<Box
				justifyContent="space-between"
				height={2}
				width="100%"
				borderStyle="single"
				borderDimColor
				borderLeft={false}
				borderRight={false}
				borderTop={false}
			>
				<Text>{boardName} | Card Details</Text>
				<Text>[ESC]</Text>
			</Box>

			{/* Title and Feature */}
			<Detail label="Title" value={card.title} />
			<Detail label="Feature" value={card.feature} />

			{/* Priority and Points row */}
			<Box width="100%" flexDirection="row" justifyContent="space-between">
				<Detail
					label="Priority"
					value={<PriorityLabel priority={card.priority} />}
				/>
				<Detail label="Points" value={String(card.points)} rightAlign={true} />
			</Box>

			{/* Description */}
			<Box width="100%" flexDirection="column" marginTop={1}>
				<Text bold>Description:</Text>
				<Box
					width="100%"
					borderStyle="single"
					borderDimColor
					flexDirection="column"
					paddingX={1}
				>
					<Text wrap="wrap">
						{card.description ?? 'No description provided.'}
					</Text>
				</Box>
			</Box>

			{/* Due Date */}
			<Box width="100%" marginTop={1}>
				<Detail label="Due Date" value={card.dueDate ?? '-'} />
			</Box>

			{/* Comments */}
			<Box width="100%" flexDirection="column" marginTop={1}>
				<Text bold>Comments ({comments.length}):</Text>
				<Box
					width="100%"
					borderStyle="single"
					borderDimColor
					flexDirection="column"
					paddingX={1}
				>
					{comments.length > 0 ? (
						comments.map(comment => (
							<CommentRow
								key={`${comment.author}-${comment.createdAt}`}
								comment={comment}
							/>
						))
					) : (
						<Text dimColor>No comments yet.</Text>
					)}
				</Box>
			</Box>

			{/* Footer */}
			<Box
				width="100%"
				marginTop={1}
				borderStyle="single"
				borderDimColor
				borderLeft={false}
				borderRight={false}
				borderBottom={false}
			>
				<Text dimColor>TAB: Switch Section | ↑↓, jk: Scroll</Text>
			</Box>
		</Box>
	);
};

const CardDetails = () => {
	const {board, getCardById} = useApp();
	const {focusState} = useFocus();
	const card = focusState.active.cardId
		? getCardById(focusState.active.cardId)
		: undefined;

	return card ? (
		<CardView card={card} boardName={board.name} />
	) : (
		<Text>No card selected</Text>
	);
};
export default CardDetails;
