import './providers/local/index.js';

import {ProviderRegistry} from './registry/ProviderRegistry.js';
import {KanbanService} from './core/KanbanService.js';
import {BoardConfig} from './core/models.js';

export function bootstrap(config: BoardConfig): KanbanService {
	const strategy = ProviderRegistry.create(config);
	return new KanbanService(strategy);
}
