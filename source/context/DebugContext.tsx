import React, {createContext, useContext, useState} from 'react';

export type DebugContextValue = {
	debug: boolean;
	debugStatements: string[];
	addStatement: (key: string, item: string) => void;
	clearStatements: () => void;
};

const DebugContext = createContext<DebugContextValue | null>(null);

export function DebugProvider({
	context,
	children,
}: {
	context: {debug: boolean};
	children: React.ReactNode;
}) {
	const [debugStatements, setDebugStatements] = useState<string[]>([]);

	const addStatement = (key: string, value: string) =>
		setDebugStatements(prev => {
			const filtered = prev.filter(s => !s.startsWith(key + ':'));
			return [...filtered, `${key}: ${value}`];
		});

	const clearStatements = () => setDebugStatements([]);

	return (
		// @ts-ignore
		<DebugContext.Provider
			value={{
				debug: context.debug,
				debugStatements,
				addStatement,
				clearStatements,
			}}
		>
			{children}
		</DebugContext.Provider>
	);
}

export function useDebug() {
	const ctx = useContext(DebugContext);
	if (!ctx) {
		throw new Error('useDebug must be used within DebugProvider');
	}
	return ctx;
}
