# Trello MCP Server

A Node.js + TypeScript project template.

## Getting Started

### Prerequisites

- Node.js (>= 18.0.0)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

### Development

1. Run in development mode:

```bash
npm run dev
```

2. Build the project:

```bash
npm run build
```

3. Start the production build:

```bash
npm start
```

4. Run linting:

```bash
npm run lint
```

5. Watch for changes during development:

```bash
npm run watch
```

## Project Structure

```
├── src/                 # Source TypeScript files
│   └── index.ts        # Main entry point
├── dist/               # Compiled JavaScript output
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── .eslintrc.json      # ESLint configuration
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## Scripts

- `npm run dev` - Run the application in development mode with ts-node
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled JavaScript
- `npm run watch` - Watch for file changes and recompile
- `npm run clean` - Remove the dist directory
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint and fix auto-fixable issues

## License

MIT
