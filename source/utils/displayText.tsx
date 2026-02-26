import {Text} from 'ink';

export const displayText = (
	text: string | null | undefined,
	replacement: Element = <Text>&nbsp;</Text>,
) => <Text>{text || replacement}</Text>;
