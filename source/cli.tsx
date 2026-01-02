import React from 'react';
import {render} from 'ink';
import App from './app.js';
import {bootstrap} from './bootstrap.js';
import {CommandProvider} from './context/CommandsContext.js';
import {DebugProvider} from './context/DebugContext.js';

const config = {provider: 'local'};
const context = bootstrap(config);
const debug: boolean = process.env?.['DEBUG'] === '1';

const {clear, unmount} = render(<div />);

render(
	<DebugProvider debug={debug}>
		<CommandProvider env={{clear, unmount}}>
			<App context={context} />
		</CommandProvider>
	</DebugProvider>,
);
