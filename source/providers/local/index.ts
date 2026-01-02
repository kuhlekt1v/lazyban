import {ProviderRegistry} from '../../registry/ProviderRegistry.js';
import {LocalStrategy} from './LocalStrategy.js';

ProviderRegistry.register('local', () => new LocalStrategy());
