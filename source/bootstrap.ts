import './providers/local/index.js';

import {ProviderRegistry} from './registry/ProviderRegistry.js';
import {KanbanContext} from './core/KanbanContext.js';

export function bootstrap(config: any): KanbanContext {
	const strategy = ProviderRegistry.create(config.provider, config);
	return new KanbanContext(strategy);
}
