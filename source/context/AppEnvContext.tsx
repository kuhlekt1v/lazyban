// context/AppEnvContext.tsx
import {createContext, useContext} from 'react';

export type AppEnv = {
	clear: () => void;
	unmount: () => void;
};

const AppEnvContext = createContext<AppEnv | null>(null);

type AppEnvProviderProps = {
	env: AppEnv;
	children: React.ReactNode;
};

export const AppEnvProvider = ({env, children}: AppEnvProviderProps) => (
	// @ts-ignore
	<AppEnvContext.Provider value={env}>{children}</AppEnvContext.Provider>
);

export const useAppEnv = () => {
	const ctx = useContext(AppEnvContext);
	if (!ctx) {
		throw new Error('useAppEnv must be used within AppEnvProvider');
	}
	return ctx;
};
