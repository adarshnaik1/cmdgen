#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";
import OpenAI from "openai";
import ora from "ora";
import dotenv from "dotenv";
import figlet from "figlet";
import inquirer from "inquirer";
import readline from "readline";
import {exec} from 'child_process'
import { editCommand } from "./functions.js";

const program = new Command();
dotenv.config();


const logoText = figlet.textSync("CmdGen", {
  font: "Standard", // try 'Ghost', 'Slant', 'Big', etc.
  horizontalLayout: "default",
  verticalLayout: "default",
});
console.log(chalk.cyan(logoText));
console.log(chalk.green("🚀 Welcome to MyCLI!"));

program
    .name("cmdgen")
    .description("suggests terminal commands based on natural language prompts")
    .version('1.0.0');


program
    .argument('<prompt>', 'Describe What you want to do')
    .action(async(prompt)=>{
        const spinner = ora("Finding Command").start();
 
        try{
            
                
                const client = new OpenAI();

                const response = await client.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant helping users to generate terminal commands for Windows systems. You should return nothing for anything outside your scope. The response should strictly contain only the directly executable command and nothing else. NO markdown, NO code blocks, NO backticks, NO explanations - just the raw command. Focus on windows system compaitable commands."
                    },
                    {
                        role: "user", 
                        content: prompt
                    }
                ]
                });

                let command = response.choices[0].message.content.trim()
                // Clean up any markdown formatting that might slip through
                command = command.replace(/```[\w]*\n?/g, '').replace(/```/g, '').trim()
                
                spinner.stop();

                 if (!command) {
                console.log(chalk.redBright('\n Sorry, no suggestion found.'));
                return;
            }

            console.log(chalk.greenBright('\n✓ Suggested Command:'));
            console.log(chalk.yellow(`> ${command}\n`));

            // Custom editable command input with proper cursor navigation
            const finalCommand = await editCommand(command);

            // Show the final command if it was changed
            if (finalCommand !== command) {
                console.log(chalk.cyan('\n📋 Final Command:'));
                console.log(chalk.white(`> ${finalCommand}\n`));
            }

           

            const { execute } = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'execute',
                    message: `Do you want to execute this command?`,
                    default: false,
                },
            ]);

            if (execute) {
                console.log(chalk.cyan('🚀 Running command...\n'));
                exec(finalCommand, (error, stdout, stderr) => {
                    if (error) {
                        console.error(chalk.red('❌ Error:'), error.message);
                        return;
                    }
                    if (stderr) {
                        console.error(chalk.red('⚠️  Warning:'), stderr);
                    }
                    if (stdout) {
                        console.log(chalk.white(stdout));
                    }
                    console.log(chalk.green('\n✅ Command completed!'));
                });
            } else {
                console.log(chalk.gray('Command not executed.'));
            }

            
        }
        catch(err)
        {
             spinner.stop();
        console.error(chalk.red('Error:'), err.message);
        }

       
    }

    )



    program.parse(process.argv)