import {Box, render, Text} from 'ink';
import App from './App.js';
import {bootstrap} from './bootstrap.js';
import {DebugProvider} from './context/DebugContext.js';
import {FocusProvider} from './context/FocusContext.js';
import {themes} from './core/theme.js';
import {AppProvider} from './context/AppContext.js';
import {checkBoardDirectory, readConfigFile} from './core/config/fs.js';
import {useEffect, useState} from 'react';
import Onboarding from './components/features/Onboarding.js';

const debug: boolean = process.env?.['DEBUG'] === '1';

// @ts-ignore
const ink = render(<div />);

const AppWraper = () => {
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

	const config = readConfigFile();
	const kanbanService = bootstrap(config);
	const theme = themes[config.theme] ?? themes['dark'];

	// @ts-ignore
	return (
		<DebugProvider context={debug}>
			<AppProvider context={{...ink, theme, kanbanService}}>
				<FocusProvider>
					<App />
				</FocusProvider>
			</AppProvider>
		</DebugProvider>
	);
};

// @ts-ignore
render(<AppWraper />);
