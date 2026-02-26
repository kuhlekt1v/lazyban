import {Text} from 'ink';
import {displayText} from '../../utils/displayText.js';
import {Priority} from '../../core/models.js';
import {getPriority} from '../../utils/priorityMap.js';
import {useTheme} from '../../context/AppContext.js';

const Priority = ({priority}: {priority?: Priority}) => {
	const theme = useTheme();
	const priorityObject = getPriority(theme, priority);
	return (
		<Text color={priorityObject?.color}>
			{displayText(priorityObject?.value, '[   ]  ')}
		</Text>
	);
};

export default Priority;
