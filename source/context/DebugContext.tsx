import React, {createContext, ReactNode, useContext, useState} from 'react';

export type DebugContextValue = {
	debug: boolean;
	debugStatements: string[];
	addStatement: (item: string) => void;
	clearStatements: () => void;
};

const DebugContext = createContext<DebugContextValue | null>(null);

export function DebugProvider({
	debug,
	children,
}: {
	debug: boolean;
	children: React.ReactNode;
}) {
	const [debugStatements, setDebugStatements] = useState<string[]>([]);
	const addStatement = (item: string) =>
		setDebugStatements(prev => [...prev, item]);
	const clearStatements = () => setDebugStatements([]);

	return (
		<DebugContext.Provider
			value={{debug, debugStatements, addStatement, clearStatements}}
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
