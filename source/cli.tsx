import React from 'react';
import {render} from 'ink';
import App from './app.js';
import {bootstrap} from './bootstrap.js';
import {AppEnvProvider} from './context/AppEnvContext.js';
import {DebugProvider} from './context/DebugContext.js';
import {FocusProvider} from './context/FocusContext.js';

const config = {provider: 'local'};
const context = bootstrap(config);
const debug: boolean = process.env?.['DEBUG'] === '1';

// @ts-ignore
const ink = render(<div />);

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
