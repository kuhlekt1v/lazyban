import React, {useState} from 'react';
import {Box, Text} from 'ink';
import path from 'node:path';
import {ConfirmPrompt} from './ConfirmPrompt.js';
import {TextInput} from './TextInput.js';
import {SelectInput} from './SelectInput.js';
import {
	createBoardDirectory,
	createConfigFile,
	createBoardFile,
	type BoardConfig,
} from '../utils/fs.js';

type OnboardingStep =
	| 'confirm'
	| 'boardName'
	| 'provider'
	| 'theme'
	| 'complete';

type Props = {
	onComplete: () => void;
	onCancel: () => void;
};

export const Onboarding = ({onComplete, onCancel}: Props) => {
	const [step, setStep] = useState<OnboardingStep>('confirm');
	const [boardName, setBoardName] = useState(path.basename(process.cwd()));
	const [provider, setProvider] = useState('local');

	const handleConfirm = (confirmed: boolean) => {
		if (confirmed) {
			setStep('boardName');
		} else {
			onCancel();
		}
	};

	const handleBoardName = (name: string) => {
		setBoardName(name);
		setStep('provider');
	};

	const handleProvider = (selectedProvider: string) => {
		setProvider(selectedProvider);
		setStep('theme');
	};

	const handleTheme = (selectedTheme: string) => {
		try {
			// Create .board directory
			createBoardDirectory();

			// Create config.yaml
			const config: BoardConfig = {
				provider,
				theme: selectedTheme,
			};
			createConfigFile(config);

			// Create board.yaml if provider is local
			if (provider === 'local') {
				createBoardFile();
			}

			setStep('complete');

			// Automatically transition to main app after showing success message
			setTimeout(() => {
				onComplete();
			}, 1500);
		} catch (error) {
			// Handle errors gracefully
			console.error('Failed to initialize .board directory:', error);
			onCancel();
		}
	};

	const handleCancel = () => {
		onCancel();
	};

	if (step === 'confirm') {
		return (
			<ConfirmPrompt
				message="The .board directory does not exist. Would you like to create it now?"
				onConfirm={handleConfirm}
			/>
		);
	}

	if (step === 'boardName') {
		return (
			<TextInput
				label="What is the name of your board?"
				defaultValue={boardName}
				onSubmit={handleBoardName}
				onCancel={handleCancel}
			/>
		);
	}

	if (step === 'provider') {
		return (
			<SelectInput
				label="What type of board provider would you like to use?"
				options={[{label: 'Local', value: 'local'}]}
				defaultValue="local"
				onSelect={handleProvider}
				onCancel={handleCancel}
			/>
		);
	}

	if (step === 'theme') {
		return (
			<SelectInput
				label="What theme would you like to use?"
				options={[
					{label: 'Dark', value: 'dark'},
					{label: 'Light', value: 'light'},
				]}
				defaultValue="dark"
				onSelect={handleTheme}
				onCancel={handleCancel}
			/>
		);
	}

	if (step === 'complete') {
		return (
			// @ts-ignore
			<Box>
				<Text color="green">
					✓ Your .board directory has been initialized successfully!
				</Text>
			</Box>
		);
	}

	return null;
};
