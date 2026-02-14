import './providers/local/index.js';

import {ProviderRegistry} from './registry/ProviderRegistry.js';
import {KanbanContext} from './core/KanbanContext.js';
import {readConfigFile} from './utils/fs.js';

export function bootstrap(config?: any): KanbanContext {
	// Try to read config from .board/config.yaml first
	const fileConfig = readConfigFile();
	const finalConfig = fileConfig || config || {provider: 'local'};

	const strategy = ProviderRegistry.create(finalConfig.provider, finalConfig);
	return new KanbanContext(strategy);
}
