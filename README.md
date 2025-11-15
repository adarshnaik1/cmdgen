# CLI Command Helper

Generate shell commands from natural-language prompts without leaving your terminal. This small utility helps you convert plain English requests into safe, copyable shell commands so you can stay in the flow while coding.

## Key idea

Ask the tool a question like "create a new React app with TypeScript and Tailwind" and it returns the appropriate command(s) ready to run. The goal is speed and convenience — not perfect automation. Always review commands before running.


<img width="1362" height="419" alt="image" src="https://github.com/user-attachments/assets/9e970bf3-326c-4d66-9ee1-5433e767bb4a" style="border-radius 10px;" />



## Features

- 🤖 **AI-powered command generation** using OpenAI GPT-4o-mini
- ✏️ **Inline command editing** with full cursor navigation and backspace support
- 🎨 **Rich terminal UI** with colors, icons, and ASCII art logo
- 🔒 **Safe execution** with confirmation prompts before running commands
- 🪟 **Windows-optimized** commands (PowerShell compatible)
- ⚡ **Fast and lightweight** with minimal dependencies
- 🔧 **Extensible architecture** for adding new LLM providers

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

**Current dependencies in package.json:**
- OpenAI API client
- Commander.js for CLI
- Inquirer for interactive prompts
- Chalk for colored output
- Ora for loading spinners
- Figlet for ASCII art logo
- Dotenv for environment variables

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

Create a `.env` file in the project root with your OpenAI API key:

```env
# OpenAI API key (required)
OPENAI_API_KEY=sk-your-actual-openai-api-key-here

<<<<<<< HEAD
# Optional: Default shell preference (currently optimized for Windows)
DEFAULT_SHELL=powershell
=======
```
# LLM provider API key (example: OpenAI)
OPENAI_API_KEY=sk-REPLACE_ME

Note:"The code is designed only to accept OpenAi API keys as of 11-11-2025. Updates will be made going further"

>>>>>>> f50dba6b842183228037ada0caeb94bf45703095
```

**Important notes:**
- Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
- Keep API keys secret - never commit `.env` to source control
- The project includes a `.gitignore` that excludes `.env` files
- Current implementation uses OpenAI's GPT-4o-mini model

## Usage

Basic flow:

<<<<<<< HEAD
1. Run the CLI with your prompt: `node index.js "your request"`
2. The tool generates a suggested command using AI
3. You can edit the command inline with full cursor navigation (arrows, backspace, Home/End)
4. Confirm whether to execute the final command
5. The command runs and shows output with status indicators
=======
1. Run the CLI.
2. Enter a natural-language prompt describing the command you want.
3. The tool returns one or more candidate commands and a short explanation.

>>>>>>> f50dba6b842183228037ada0caeb94bf45703095

Example usage:

```powershell
node index.js "create a new React app with TypeScript"

   ____               _  ____
  / ___|_ __ ___   __| |/ ___| ___ _ __
 | |   | '_ ` _ \ / _` | |  _ / _ \ '_ \
 | |___| | | | | | (_| | |_| |  __/ | | |
  \____|_| |_| |_|\__,_|\____|___|_| |_|

<<<<<<< HEAD
🚀 Welcome to MyCLI!

✓ Suggested Command:
> npx create-react-app my-app --template typescript

Edit the command below (use ←→ arrows, backspace, Home/End, etc.):
Command: npx create-react-app my-awesome-app  # User can edit inline

? Do you want to execute this command? (y/N)
=======
>>>>>>> f50dba6b842183228037ada0caeb94bf45703095
```

## Safety & best practices

- The tool is a command *suggestion* assistant — you must review commands before running them.
- Avoid sending full secrets or private files to remote LLM providers unless you trust their policy.

## Future phases / roadmap

Planned improvements and ideas for future work:

1. CLI options for setting defaults
	- `--provider` to set a default LLM provider
	- `--shell` to select default shell / also planning to  auto detect the OS and generate commands accordingly
	- `--no-prompt` for non-interactive mode

2. Local LLM support (e.g., Ollama)
	- Add an adapter so users can run local LLMs for privacy and lower latency.

3. Internal knowledge base / caching
	- Cache common queries and their best answers in a key-value store for instant suggestions.
	- Provide a user-editable KB so you can keep frequently used, vetted commands.

4. ✅ Edit-before-run option (COMPLETED)
	- Implemented inline command editing with full cursor navigation
	- Users can modify specific parts of commands without losing the entire text
	- Supports arrow keys, backspace, Home/End, and character insertion

5. Better multi-command flows
	- Produce and preview multi-step scripts, with dry-run mode and safety checks.

6. Tests and CI
	- Add unit tests for prompt-to-command mappings and integration tests for providers.


## Contributing

Contributions welcome. Suggested starting tasks:

- Add provider adapters (OpenAI, Anthropic, Ollama)
- Implement the `.cli-index.json` generator and small search API
- Add tests for prompt parsing and CLI interactions

## Files of interest

- `index.js`: small CLI entry point and prompt handling
- `package.json`: scripts and runtime deps
- `.env`: local secrets (not checked in)

##

## License

GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

[Full license text at: https://www.gnu.org/licenses/gpl-3.0.en.html]

## Final notes to myself
1. This product should actually work towards improviing the dev productivity.
2. Most of the people use context aware tools like copilot to ask for commands but there are still some guys ditching the copilot for theri love of the terminal. How could I possibly make their experience better?
3. should I introduce a file Indexer with something like treesitter or ANTLR
4. 
