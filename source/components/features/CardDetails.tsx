import {ReactNode, useRef, useState} from 'react';
import {Text, useInput} from 'ink';
import {useApp, useTheme} from '../../context/AppContext.js';
import {useFocus} from '../../context/FocusContext.js';
import {Card, Comment, Priority as PriorityType} from '../../core/models.js';
import Box from '../shared/Box.js';
import Priority from '../shared/Priority.js';
import {ScrollView, ScrollViewRef} from 'ink-scroll-view';
import {ScrollBarBox} from '@byteland/ink-scroll-bar';

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

type ActiveSection = 'none' | 'details' | 'comments';

const CardView = ({boardName, card}: CardViewProps) => {
	const theme = useTheme();
	const comments = card.comments ?? [];
	const [activeSection, setActiveSection] = useState<ActiveSection>('none');
	const detailsScrollRef = useRef<ScrollViewRef>(null);
	const commentsScrollRef = useRef<ScrollViewRef>(null);

	// Track scroll state for description section
	const [detailsScrollOffset, setDetailsScrollOffset] = useState(0);
	const [detailsContentHeight, setDetailsContentHeight] = useState(0);
	const [detailsViewportHeight, setDetailsViewportHeight] = useState(0);

	// Track scroll state for comments section
	const [commentsScrollOffset, setCommentsScrollOffset] = useState(0);
	const [commentsContentHeight, setCommentsContentHeight] = useState(0);
	const [commentsViewportHeight, setCommentsViewportHeight] = useState(0);

	// Handle TAB key to switch between sections
	useInput((input, key) => {
		if (key.tab) {
			setActiveSection(prev => {
				if (prev === 'none' || prev === 'comments') return 'details';
				return 'comments';
			});
		}

		// Handle scroll for active section
		const scrollRef =
			activeSection === 'details' ? detailsScrollRef : commentsScrollRef;
		if (!scrollRef.current || activeSection === 'none') return;

		// Only allow scrolling when content exceeds the viewport
		const canScroll =
			activeSection === 'details'
				? detailsContentHeight > detailsViewportHeight
				: commentsContentHeight > commentsViewportHeight;
		if (!canScroll) return;

		if (key.upArrow || input === 'k') {
			scrollRef.current.scrollBy(-1);
		} else if (key.downArrow || input === 'j') {
			scrollRef.current.scrollBy(1);
		}
	});

	return (
		<Box width="100%" height="100%" flexDirection="column" marginX={1}>
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
				flexShrink={0}
			>
				<Text>{boardName} | Card Details</Text>
				<Text>[ESC]</Text>
			</Box>

			{/* Title and Feature */}
			<Box flexShrink={0}>
				<Detail label="Title" value={card.title} />
			</Box>
			<Box flexShrink={0}>
				<Detail label="Feature" value={card.feature} />
			</Box>

			{/* Priority and Points row */}
			<Box
				width="100%"
				flexDirection="row"
				justifyContent="space-between"
				flexShrink={0}
			>
				<Detail
					label="Priority"
					value={<PriorityLabel priority={card.priority} />}
				/>
				<Detail label="Points" value={String(card.points)} rightAlign={true} />
			</Box>

			{/* Description with ScrollView */}
			<Box width="100%" flexDirection="column" marginTop={1} flexShrink={0}>
				<Text bold>Description:</Text>
				{/* @ts-ignore */}
				<ScrollBarBox
					width="100%"
					height={8}
					borderStyle="single"
					borderColor={
						activeSection === 'details' ? theme.PRIMARY : theme.SECONDARY
					}
					contentHeight={detailsContentHeight}
					viewportHeight={detailsViewportHeight}
					scrollOffset={detailsScrollOffset}
					scrollBarAutoHide
				>
					{/* @ts-ignore */}
					<ScrollView
						ref={detailsScrollRef}
						onScroll={setDetailsScrollOffset}
						onContentHeightChange={(h: number) => setDetailsContentHeight(h)}
						onViewportSizeChange={(s: {width: number; height: number}) =>
							setDetailsViewportHeight(s.height)
						}
					>
						<Box paddingX={1}>
							<Text wrap="wrap">
								{card.description ?? 'No description provided.'}
							</Text>
						</Box>
					</ScrollView>
				</ScrollBarBox>
			</Box>

			{/* Due Date */}
			<Box width="100%" marginTop={1} flexShrink={0}>
				<Detail label="Due Date" value={card.dueDate ?? '-'} />
			</Box>

			{/* Comments with ScrollView */}
			<Box width="100%" flexDirection="column" marginTop={1} flexGrow={1}>
				<Text bold>Comments ({comments.length}):</Text>
				{/* @ts-ignore */}
				<ScrollBarBox
					width="100%"
					height={8}
					borderStyle="single"
					borderColor={
						activeSection === 'comments' ? theme.PRIMARY : theme.SECONDARY
					}
					contentHeight={commentsContentHeight}
					viewportHeight={commentsViewportHeight}
					scrollOffset={commentsScrollOffset}
					scrollBarAutoHide
				>
					{/* @ts-ignore */}
					<ScrollView
						ref={commentsScrollRef}
						onScroll={setCommentsScrollOffset}
						onContentHeightChange={(h: number) => setCommentsContentHeight(h)}
						onViewportSizeChange={(s: {width: number; height: number}) =>
							setCommentsViewportHeight(s.height)
						}
					>
						<Box paddingX={1} flexDirection="column">
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
					</ScrollView>
				</ScrollBarBox>
			</Box>

			{/* Footer - Fixed to bottom */}
			<Box
				width="100%"
				marginTop={1}
				borderStyle="single"
				borderDimColor
				borderLeft={false}
				borderRight={false}
				borderBottom={false}
				flexShrink={0}
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
