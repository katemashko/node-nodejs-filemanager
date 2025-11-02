import readline from "node:readline/promises";

import * as navigation from "./commands/navigation/index.js";
import * as basicFs from "./commands/fs/index.js";

// ******** general ********

const args = process.argv.slice(2);
let username = "";
args.forEach((arg) => {
  if (arg.startsWith("--username=")) {
    username = arg.split("=")[1];
  }
});

const allowedCommands = ["cat", "cd", "ls", "up", ".exit"];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const main = async () => {
  //  ******** welcoming ********

  console.log(`Welcome to the File Manager, ${username}!`);
  navigation.showCurrentWorkingDirectory();

  //  ******** finalization ********

  rl.on("SIGINT", () => exitProgram());

  // ******** exit ********

  function exitProgram() {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    navigation.showCurrentWorkingDirectory();
    process.exit(0);
  }

  // ******** commands ********

  while (true) {
    try {
      // ******** input processing ********

      const input = await rl.question("Print command: \n");
      const trimmedInput = input.trim();
      const [command, argOne, argTwo] = trimmedInput.split(" ");

      //   unknown operation
      if (!allowedCommands.includes(command)) {
        console.log("Invalid input");
      }

      if (command === "cd") {
        await navigation.cd(argOne);
      }

      if (command === "up") {
        navigation.up();
      }

      if (command === "ls") {
        await navigation.ls();
      }

      if (command === "cat") {
        await basicFs.cat(argOne);
      }

      if (command === ".exit") {
        exitProgram();
      }
    } catch (error) {
      console.log(`Operation failed: ${error.message}`);
    } finally {
      navigation.showCurrentWorkingDirectory();
      console.log("\n");
    }
  }
};

main();
