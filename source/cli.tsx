import React from 'react';
import {render} from 'ink';
import App from './app.js';
import {bootstrap} from './bootstrap.js';
import {AppEnvProvider} from './context/AppEnvContext.js';
import {DebugProvider} from './context/DebugContext.js';
import {FocusProvider} from './context/FocusContext.js';
import {loadConfig} from './core/config/loadConfig.js';
import {themes} from './core/theme.js';

const config = loadConfig();
const context = bootstrap(config);
const debug: boolean = process.env?.['DEBUG'] === '1';
const theme = themes[config.theme] ?? themes['dark'];

// @ts-ignore
const ink = render(<div />);

render(
	// @ts-ignore
	<AppEnvProvider env={{...ink, theme}}>
		<DebugProvider debug={debug}>
			<FocusProvider>
				<App context={context} />
			</FocusProvider>
		</DebugProvider>
	</AppEnvProvider>,
);
