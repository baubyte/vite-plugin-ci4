import eslint from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import globals from 'globals'

export default [
	{
		ignores: [
			'dist/**',
			'node_modules/**',
			'build.config.js',
			'*.d.ts',
			'coverage/**',
			'.github/**'
		]
	},
	eslint.configs.recommended,
	{
		files: ['src/**/*.ts', 'tests/**/*.ts'],
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: './tsconfig.json'
			},
			globals: {
				...globals.node,
				...globals.es2021
			}
		},
		plugins: {
			'@typescript-eslint': tseslint
		},
		rules: {
			// Disable base rule and use TypeScript version
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_'
				}
			],
			'@typescript-eslint/no-explicit-any': 'error',
			'no-console': 'off',
			'no-undef': 'off' // TypeScript handles this
		}
	}
]
