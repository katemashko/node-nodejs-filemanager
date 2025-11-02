import readline from "node:readline/promises";

import * as navigation from "./commands/navigation/index.js";
import * as basicFs from "./commands/fs/index.js";
import * as osCommands from "./commands/os/index.js";
import * as hashFile from "./commands/hash/index.js";
import * as archive from "./commands/archive/index.js";

// ******** general ********

const args = process.argv.slice(2);
let username = "";
args.forEach((arg) => {
  if (arg.startsWith("--username=")) {
    username = arg.split("=")[1];
  }
});

const allowedCommands = [
  "add",
  "cat",
  "cd",
  "compress",
  "cp",
  "decompress",
  "hash",
  "mkdir",
  "ls",
  "mv",
  "os",
  "rn",
  "rm",
  "up",
  ".exit",
];

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

      if (command === "add") {
        await basicFs.add(argOne);
      }

      if (command === "mkdir") {
        await navigation.mkdir(argOne);
      }

      if (command === "rn") {
        await basicFs.rn(argOne, argTwo);
      }

      if (command === "cp") {
        await basicFs.cp(argOne, argTwo);
      }

      if (command === "mv") {
        await basicFs.mv(argOne, argTwo);
      }

      if (command === "rm") {
        await basicFs.rm(argOne);
      }

      if (command === "os") {
        osCommands.executeOsCommand(argOne);
      }

      if (command === "hash") {
        await hashFile.hash(argOne);
      }

      if (command === "compress") {
        await archive.compress(argOne, argTwo);
      }

      if (command === "decompress") {
        await archive.decompress(argOne, argTwo);
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
