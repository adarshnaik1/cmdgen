import chalk from "chalk";
import readline from "readline"
// Custom command editor with proper cursor navigation
export function editCommand(initialCommand) {
    return new Promise((resolve) => {
        console.log(chalk.gray('\nEdit the command below (use ←→ arrows, backspace, Home/End, etc.):'));
        
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        // Set the prompt and pre-fill with initial command
        process.stdout.write(chalk.cyan('Command: '));
        rl.write(initialCommand);

        rl.on('line', (input) => {
            rl.close();
            resolve(input.trim());
        });

        rl.on('SIGINT', () => {
            console.log('\n' + chalk.gray('Operation cancelled.'));
            rl.close();
            resolve(initialCommand); // Return original command if cancelled
        });
    });
}
