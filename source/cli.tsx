import {useState, useEffect} from 'react';
import {render, Box, Text} from 'ink';
import App from './app.js';
import {bootstrap} from './bootstrap.js';
import {AppEnvProvider} from './context/AppEnvContext.js';
import {DebugProvider} from './context/DebugContext.js';
import {FocusProvider} from './context/FocusContext.js';
import {checkBoardDirectory} from './utils/fs.js';
import {Onboarding} from './components/Onboarding.js';

const debug: boolean = process.env?.['DEBUG'] === '1';

// Main wrapper component to handle onboarding state
const AppWrapper = () => {
	const [showOnboarding, setShowOnboarding] = useState(!checkBoardDirectory());
	const [showWarning, setShowWarning] = useState(false);

	useEffect(() => {
		if (showWarning) {
			const timer = setTimeout(() => {
				process.exit(0);
			}, 1000);
			return () => clearTimeout(timer);
		}

		return undefined;
	}, [showWarning]);

	if (showWarning) {
		return (
			// @ts-ignore
			<Box marginTop={1}>
				<Text color="yellow">⚠ You need a .board directory to continue.</Text>
			</Box>
		);
	}

	if (showOnboarding) {
		return (
			<Onboarding
				onComplete={() => setShowOnboarding(false)}
				onCancel={() => setShowWarning(true)}
			/>
		);
	}

	const context = bootstrap();
	return (
		<DebugProvider debug={debug}>
			<FocusProvider>
				<App context={context} />
			</FocusProvider>
		</DebugProvider>
	);
};

// @ts-ignore
const ink = render(<Box />);

render(
	// @ts-ignore
	<AppEnvProvider env={ink}>
		<AppWrapper />
	</AppEnvProvider>,
);
