import {KanbanStrategy} from '../core/KanbanStrategy.js';
import {BoardConfig} from '../core/models.js';

type StrategyFactory = (config: BoardConfig) => KanbanStrategy;

export class ProviderRegistry {
	private static providers = new Map<string, StrategyFactory>();

	static register(name: string, factory: StrategyFactory) {
		this.providers.set(name, factory);
	}

	static create(config: any): KanbanStrategy {
		const factory = this.providers.get(config.provider);
		if (!factory) {
			throw new Error(`Provider not registered: ${config.provider}`);
		}
		return factory(config);
	}
}
