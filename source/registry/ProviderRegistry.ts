import {KanbanStrategy} from '../core/KanbanStrategy.js';

type StrategyFactory = (config: any) => KanbanStrategy;

export class ProviderRegistry {
	private static providers = new Map<string, StrategyFactory>();

	static register(name: string, factory: StrategyFactory) {
		this.providers.set(name, factory);
	}

	static create(name: string, config: any): KanbanStrategy {
		const factory = this.providers.get(name);
		if (!factory) {
			throw new Error(`Provider not registered: ${name}`);
		}
		return factory(config);
	}
}
