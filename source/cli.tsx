import {render} from 'ink';
import App from './app.js';
import {bootstrap} from './bootstrap.js';
import {DebugProvider} from './context/DebugContext.js';
import {FocusProvider} from './context/FocusContext.js';
import {loadConfig} from './core/config/loadConfig.js';
import {themes} from './core/theme.js';
import {AppProvider} from './context/AppContext.js';

// Loads from .board directory if it exists
const config = loadConfig();
/* TODO: If .board does not exist, trigger initialization flow
 *       to create config and select provider.
 */
const kanbanService = bootstrap(config);
const context = bootstrap(config);
const debug: boolean = process.env?.['DEBUG'] === '1';
const theme = themes[config.theme] ?? themes['dark'];

// @ts-ignore
const ink = render(<div />);

render(
	// @ts-ignore
	<AppProvider context={{...ink, theme, kanbanService}}>
		<DebugProvider context={debug}>
			<FocusProvider>
				<App context={context} />
			</FocusProvider>
		</DebugProvider>
	</AppProvider>,
);
