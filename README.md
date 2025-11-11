# CLI Command Helper

Generate shell commands from natural-language prompts without leaving your terminal. This small utility helps you convert plain English requests into safe, copyable shell commands so you can stay in the flow while coding.

## Key idea

Ask the tool a question like "create a new React app with TypeScript and Tailwind" and it returns the appropriate command(s) ready to run. The goal is speed and convenience — not perfect automation. Always review commands before running.
<img width="647" height="259" alt="The Command Line  interface" src="https://github.com/user-attachments/assets/0799fcda-aa9b-4b55-b0bf-0a47a1264007" />


## Features

- Convert natural language prompts into shell commands (cross-platform friendly, examples use PowerShell/Unix variants)
- Optionally show explanations and let you edit the command before execution
- Minimal, extensible project scaffold so you can hook different LLM providers or local LLMs later

## Quick install

Prerequisites:

- Node.js 16+ (recommended) and npm/yarn
- An LLM provider API key (or a local LLM runtime if you add support later)

Install steps (Windows PowerShell example):

```powershell
cd 'C:\Users\ADARSH NAIK\Desktop\cli_command_helper'
npm install
```

If you prefer yarn:

```powershell
cd 'C:\Users\ADARSH NAIK\Desktop\cli_command_helper'
yarn install
```

## Dependencies

This project is intentionally lightweight. Typical dependencies you may see in `package.json`:

- axios or node-fetch — for API calls to LLM providers
- dotenv — load `.env` variables locally
- inquirer or prompts — for interactive CLI prompts

Install them with:

```powershell
npm install openai chalk commander ora dotenv inquirer figlet
```

or with yarn:

```powershell
yarn add  openai chalk commander ora dotenv inquirer figlet
```

## .env format

Create a `.env` file in the project root with provider credentials and optional defaults.

Example `.env`:

```
# LLM provider API key (example: OpenAI)
OPENAI_API_KEY=sk-REPLACE_ME

Note:"The code is designed only to accept OpenAi API keys as of 11-11-2025. Updates will be made going further"

```

Notes:

- Keep API keys secret. Do not check `.env` into source control. Add `.env` to your `.gitignore`.
- If you add other providers, include appropriate keys (e.g., OLLAMA_HOST, OLLAMA_API_KEY for local runtimes).

## Usage

Basic flow:

1. Run the CLI.
2. Enter a natural-language prompt describing the command you want.
3. The tool returns one or more candidate commands and a short explanation.


Example (conceptual):

```powershell
node index.js
> Create a new React app with TypeScript

Suggested command:
npx create-react-app my-app --template typescript

```

The CLI will prompt and let you pick an action.

## Safety & best practices

- The tool is a command *suggestion* assistant — you must review commands before running them.
- Avoid sending full secrets or private files to remote LLM providers unless you trust their policy.

## Future phases / roadmap

Planned improvements and ideas for future work:

1. CLI options for setting defaults
	- `--provider` to set a default LLM provider
	- `--shell` to select default shell
	- `--no-prompt` for non-interactive mode

2. Local LLM support (e.g., Ollama)
	- Add an adapter so users can run local LLMs for privacy and lower latency.

3. Internal knowledge base / caching
	- Cache common queries and their best answers in a key-value store for instant suggestions.
	- Provide a user-editable KB so you can keep frequently used, vetted commands.

4. Edit-before-run option
	- Let the user open the suggested command in their editor before execution (local editing workflow).

5. Better multi-command flows
	- Produce and preview multi-step scripts, with dry-run mode and safety checks.

6. Tests and CI
	- Add unit tests for prompt-to-command mappings and integration tests for providers.

## Indexing your codebase (design notes — hard problem)

One of the longer-term goals is to make the CLI aware of your codebase so it can generate commands tailored to your repo (e.g., run the right npm script, test a specific package, or operate on the correct path).

Key ideas and approaches:

- File metadata index: walk the repo and build a small index of files, package.json scripts, git remotes, build tools, and README sections. Store the index in a compact JSON/SQLite cache and refresh incrementally.

- Token-efficient search: Instead of sending entire files to an LLM, index and send small, relevant excerpts. Use embeddings (vector DB) to find the most relevant files/lines for a query.

- Incremental/update strategy: Watch filesystem changes and update only modified files in the index for speed.

- Privacy: Keep the index local by default. If using a remote LLM, only send minimal context extracts necessary to formulate a command.

- Heuristics for relevance: prioritize package.json scripts, Dockerfiles, Makefiles, CI configs, common entry points (src/index, app.js), and test folders.

Challenges:

- Choosing the right granularity: too fine -> huge index; too coarse -> irrelevant results.
- Cost of embeddings / vector DB for large repos.
- Mapping between natural language intent and actionable repo artifacts reliably.

Suggested lightweight plan to start:

1. Implement a simple file walker that extracts:
	- package.json scripts
	- top-level README headings
	- Dockerfile, Makefile, and common config files
	Store these in a JSON file `.cli-index.json`.

2. Add a search function that, given a prompt, checks for matching script names or filenames via fuzzy matching.

3. If fuzzy match fails, fall back to LLM with a short context snippet (e.g., the matched package.json script or README section).

Once this is stable, consider adding an embeddings-based vector index for more semantic search.

## Contributing

Contributions welcome. Suggested starting tasks:

- Add provider adapters (OpenAI, Anthropic, Ollama)
- Implement the `.cli-index.json` generator and small search API
- Add tests for prompt parsing and CLI interactions

## Files of interest

- `index.js`: small CLI entry point and prompt handling
- `package.json`: scripts and runtime deps
- `.env`: local secrets (not checked in)

## License

Will be added later> Please contact the owner of teh repository for questions if  any



