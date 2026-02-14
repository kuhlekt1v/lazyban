// context/AppEnvContext.tsx
import React, {createContext, useContext} from 'react';

export type AppEnv = {
	clear: () => void;
	unmount: () => void;
};

const AppEnvContext = createContext<AppEnv | null>(null);

export const AppEnvProvider = ({
	env,
	children,
}: {
	env: AppEnv;
	children: React.ReactNode;
}) => (
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
