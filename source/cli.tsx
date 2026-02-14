import React from 'react';
import {render, Box} from 'ink';
import {Text} from 'ink';
import App from './app.js';
import {bootstrap} from './bootstrap.js';
import {AppEnvProvider} from './context/AppEnvContext.js';
import {DebugProvider} from './context/DebugContext.js';
import {FocusProvider} from './context/FocusContext.js';
import {checkBoardDirectory} from './utils/fs.js';
import {Onboarding} from './components/Onboarding.js';

const debug: boolean = process.env?.['DEBUG'] === '1';

// Check if .board directory exists
const boardExists = checkBoardDirectory();

if (!boardExists) {
	// Show onboarding flow
	// @ts-ignore
	const ink = render(<Box />);

	render(
		// @ts-ignore
		<AppEnvProvider env={ink}>
			<Onboarding
				onComplete={() => {
					// After onboarding completes, relaunch with main app
					const context = bootstrap();
					render(
						// @ts-ignore
						<AppEnvProvider env={ink}>
							<DebugProvider debug={debug}>
								<FocusProvider>
									<App context={context} />
								</FocusProvider>
							</DebugProvider>
						</AppEnvProvider>,
					);
				}}
				onCancel={() => {
					console.log('\n');
					// @ts-ignore
					render(
						<Text color="yellow">
							⚠ You need a .board directory to continue.
						</Text>,
					);
					setTimeout(() => {
						process.exit(0);
					}, 1000);
				}}
			/>
		</AppEnvProvider>,
	);
} else {
	// Normal app flow
	const context = bootstrap();
	// @ts-ignore
	const ink = render(<Box />);

	render(
		// @ts-ignore
		<AppEnvProvider env={ink}>
			<DebugProvider debug={debug}>
				<FocusProvider>
					<App context={context} />
				</FocusProvider>
			</DebugProvider>
		</AppEnvProvider>,
	);
}
