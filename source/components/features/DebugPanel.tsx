import {Newline, Text} from 'ink';
import {Box} from '../shared/index.js';
import {useDebug} from '../../context/DebugContext.js';

const DebugPanel = () => {
	const {debug, debugStatements} = useDebug();
	if (!debug) return null;

	return (
		<Box
			borderStyle="round"
			borderColor="yellow"
			paddingX={1}
			marginTop={1}
			flexDirection="row"
		>
			<Text>
				<Text color="yellow">DEBUG MODE</Text>
				<Newline />
				{debugStatements.map((statement: string, index: number) => (
					<>
						<Text key={index}>{statement}</Text>
						<Newline />
					</>
				))}
			</Text>
		</Box>
	);
};

export default DebugPanel;
