import './providers/local/index.js';

import {ProviderRegistry} from './registry/ProviderRegistry.js';
import {KanbanContext} from './core/KanbanContext.js';
import {BoardConfig} from './core/config/defaults.js';

export function bootstrap(config: BoardConfig): KanbanContext {
	const strategy = ProviderRegistry.create(config.provider, config);
	return new KanbanContext(strategy);
}
